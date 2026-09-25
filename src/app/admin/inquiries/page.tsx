"use client";

import { useState, useEffect } from "react";
import { ref, get, remove } from "firebase/database";
import { database } from "../../../lib/firebase";
import { Search, Loader2, Calendar, Mail, Phone, User, Globe, Trash2, AlertTriangle, X } from "lucide-react";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<string[] | null>(null);
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Reset visible count when search changes so user sees the top results
  useEffect(() => {
    setVisibleCount(10);
    setSelectedIds(new Set());
    setDeleteTarget(null);
  }, [searchTerm]);

  const handleConfirmDelete = async () => {
    if (!deleteTarget || !confirmChecked) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await Promise.all(
        deleteTarget.map(id => remove(ref(database, `inquiries/${id}`)))
      );
      // Remove from UI state
      setInquiries(prev => prev.filter(i => !deleteTarget.includes(i.id)));
      // Clean up selection
      setSelectedIds(prev => {
        const next = new Set(prev);
        deleteTarget.forEach(id => next.delete(id));
        return next;
      });
      // Close modal
      setDeleteTarget(null);
      setConfirmChecked(false);
    } catch (err) {
      setDeleteError('Failed to delete. Please try again.');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const inquiriesRef = ref(database, "inquiries");
        const snapshot = await get(inquiriesRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          // Convert Realtime DB object to array and add the unique key as 'id'
          const formattedData = Object.entries(data).map(([key, value]: any) => ({
            id: key,
            ...value,
          }));

          // Sort by newest first
          formattedData.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });

          setInquiries(formattedData);
        } else {
          setInquiries([]);
        }
      } catch (error) {
        console.error("Error fetching inquiries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // Filter inquiries based on search term
  const filteredInquiries = inquiries.filter((inq) =>
    inq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq.preferredCountry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-brand-dark tracking-tight">Student Inquiries</h1>
          <p className="text-slate-500 font-medium mt-1">Manage and respond to consultation requests.</p>
        </div>

        {/* Search Bar & Actions */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {selectedIds.size > 0 && (
            <button
              onClick={() => { setDeleteTarget(Array.from(selectedIds)); setConfirmChecked(false); }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-bold transition-colors whitespace-nowrap shadow-sm"
            >
              Delete selected ({selectedIds.size})
            </button>
          )}

          <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors shadow-sm whitespace-nowrap">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
              checked={filteredInquiries.slice(0, visibleCount).length > 0 && filteredInquiries.slice(0, visibleCount).every(i => selectedIds.has(i.id))}
              onChange={(e) => {
                const visibleIds = filteredInquiries.slice(0, visibleCount).map(i => i.id);
                setSelectedIds(prev => {
                  const next = new Set(prev);
                  if (e.target.checked) {
                    visibleIds.forEach(id => next.add(id));
                  } else {
                    visibleIds.forEach(id => next.delete(id));
                  }
                  return next;
                });
              }}
            />
            Select all shown
          </label>

          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search name, email, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary w-full md:w-72 shadow-sm"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-200">
          <Loader2 className="w-8 h-8 text-brand-primary animate-spin mb-4" />
          <p className="text-slate-500 font-bold">Loading inquiries...</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-4 w-12 text-center"></th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Student Name</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Destination</th>
                  <th className="p-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 w-12 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.slice(0, visibleCount).map((inq) => {
                    const date = inq.createdAt ? new Date(inq.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'short', day: 'numeric'
                    }) : 'Unknown Date';

                    // Fallback to check common variable names for the country field
                    const preferredDestination = inq.country || inq.preferredCountry || inq.destination || "Not specified";

                    return (
                      <tr key={inq.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 text-center whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary cursor-pointer"
                            checked={selectedIds.has(inq.id)}
                            onChange={(e) => {
                              setSelectedIds(prev => {
                                const next = new Set(prev);
                                if (e.target.checked) next.add(inq.id);
                                else next.delete(inq.id);
                                return next;
                              });
                            }}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Calendar className="w-4 h-4" /> {date}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 font-bold text-brand-dark">
                            <User className="w-4 h-4 text-slate-400" /> {inq.name || "N/A"}
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap space-y-1">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Mail className="w-4 h-4 text-slate-400" />
                            <a href={`mailto:${inq.email}`} className="hover:text-brand-primary">{inq.email || "N/A"}</a>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Phone className="w-4 h-4 text-slate-400" />
                            <a href={`tel:${inq.phone}`} className="hover:text-brand-primary">{inq.phone || "N/A"}</a>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                            <Globe className="w-4 h-4 text-slate-400" />
                            <span className={preferredDestination === "Not specified" ? "text-slate-400 italic" : ""}>
                              {preferredDestination}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            New Lead
                          </span>
                        </td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteTarget([inq.id]);
                              setConfirmChecked(false);
                            }}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 font-medium">
                      No inquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {filteredInquiries.length > 0 && (
            <div className="p-6 border-t border-slate-200 flex flex-col items-center justify-center gap-4 bg-slate-50/30">
              <p className="text-sm font-medium text-slate-500">
                Showing {Math.min(visibleCount, filteredInquiries.length)} of {filteredInquiries.length} inquiries
              </p>
              {visibleCount < filteredInquiries.length ? (
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-brand-dark hover:bg-slate-50 px-4 py-2 rounded-xl font-bold shadow-sm transition-all"
                >
                  Load more
                </button>
              ) : (
                <p className="text-xs font-bold text-slate-400">All inquiries loaded.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold">
                  {deleteTarget.length === 1 ? "Delete this inquiry?" : `Delete ${deleteTarget.length} inquiries?`}
                </h2>
              </div>
              <button
                onClick={() => { setDeleteTarget(null); setConfirmChecked(false); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-red-50 text-red-800 p-4 rounded-xl text-sm mb-6 border border-red-100">
              <p className="font-bold mb-2">This action is permanent and cannot be undone.</p>
              <p>The selected data will be removed from the database immediately.</p>
            </div>

            <div className="mb-6 max-h-40 overflow-y-auto bg-slate-50 rounded-xl p-4 border border-slate-100">
              <ul className="text-sm text-slate-600 space-y-2">
                {inquiries
                  .filter(i => deleteTarget.includes(i.id))
                  .slice(0, 5)
                  .map(i => (
                    <li key={i.id} className="flex justify-between items-center gap-4">
                      <span className="font-medium text-slate-800 truncate">{i.name || "Unknown"}</span>
                      <span className="text-slate-500 text-xs shrink-0">{i.phone || i.email || "No contact info"}</span>
                    </li>
                  ))}
                {deleteTarget.length > 5 && (
                  <li className="text-center font-bold text-slate-400 pt-2 border-t border-slate-200 mt-2">
                    ... and {deleteTarget.length - 5} more
                  </li>
                )}
              </ul>
            </div>

            <label className="flex items-start gap-3 cursor-pointer p-4 border border-red-200 rounded-xl bg-white hover:bg-red-50 transition-colors mb-6 group">
              <input
                type="checkbox"
                checked={confirmChecked}
                onChange={(e) => setConfirmChecked(e.target.checked)}
                className="mt-1 rounded border-red-300 text-red-600 focus:ring-red-600 focus:ring-offset-0"
              />
              <span className="text-sm font-bold text-red-700 group-hover:text-red-800 leading-tight">
                I understand this is permanent and cannot be undone
              </span>
            </label>

            {deleteError && (
              <p className="text-red-600 text-sm font-bold mb-4 text-center">{deleteError}</p>
            )}

            <div className="flex items-center gap-3">
              <button
                onClick={() => { setDeleteTarget(null); setConfirmChecked(false); }}
                className="flex-1 py-3 px-4 border border-slate-300 rounded-xl font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={!confirmChecked || deleting}
                className="flex-1 py-3 px-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                {deleting ? "Deleting..." : "Delete permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}