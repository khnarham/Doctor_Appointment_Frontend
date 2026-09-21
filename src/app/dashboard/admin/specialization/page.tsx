'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  Stethoscope, 
  Search, 
  Plus, 
  Layers, 
  Users, 
  Clock, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  LayoutGrid, 
  List,
  Sparkles,
  X,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Specialization } from '@/lib/schema/specialization';
import { CreateSpecializationForm } from '../../components/doctor-components/Specialziation';
import { ListSpecialization, UpdateSpecialization, DeleteSpecialization } from '@/app/api/specialization';

export default function SpecializationsPage() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // States for Edit & Delete Modals
  const [editingItem, setEditingItem] = useState<Specialization | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // 1. QUERY: Fetch All
  const { data: specializations = [], isLoading } = useQuery({
    queryKey: ['specializations'],
    queryFn: ListSpecialization,
  });

  // 2. MUTATION: Update Specialization
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string; description: string } }) =>
      UpdateSpecialization(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specializations'] });
      setEditingItem(null);
    },
  });

  // 3. MUTATION: Delete Specialization
  const deleteMutation = useMutation({
    mutationFn: (id: string) => DeleteSpecialization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specializations'] });
      setDeletingId(null);
    },
  });

  const filteredItems = specializations
    .filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clinical Specializations</h1>
            <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-100 text-teal-700 rounded-full border border-teal-200">
              {specializations.length} Total
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure medical departments and classify doctor expertise across the clinic.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(!showCreateModal)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-600/20 transition-all duration-150"
        >
          <Plus className="h-4 w-4" />
          <span>{showCreateModal ? 'Close Form' : 'New Specialization'}</span>
        </button>
      </div>

      {/* 2. STATS METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Active Domains</p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{specializations.length}</p>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Assigned Doctors</p>
            <p className="text-xl font-bold text-slate-900 mt-0.5">18 Doctors</p>
          </div>
        </div>

        <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">System Status</p>
            <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Fully Operational
            </p>
          </div>
        </div>
      </div>

      {/* 3. CONDITIONAL CREATION FORM PANEL */}
      {showCreateModal && (
        <div className="p-1 bg-slate-100 rounded-3xl border border-slate-200 animate-in fade-in slide-in-from-top-3 duration-200">
          <CreateSpecializationForm />
        </div>
      )}

      {/* 4. SEARCH & VIEW TOGGLE CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 border border-slate-200 rounded-2xl shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search specialization by name or description..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-end sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
              viewMode === 'grid' 
                ? "bg-white text-teal-700 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            <span>Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={cn(
              "p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
              viewMode === 'table' 
                ? "bg-white text-teal-700 shadow-sm" 
                : "text-slate-500 hover:text-slate-800"
            )}
          >
            <List className="h-4 w-4" />
            <span>Table</span>
          </button>
        </div>
      </div>

      {/* 5. DATA CONTENT DISPLAY */}
      {isLoading ? (
        <div className="p-12 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-teal-600" />
          <span>Loading specializations...</span>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
          <Stethoscope className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No specializations found</p>
          <p className="text-xs text-slate-400 mt-0.5">Try adjusting your search query or add a new domain.</p>
        </div>
      ) : viewMode === 'grid' ? (
        
        /* GRID VIEW MATRIX */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white border border-slate-200 hover:border-teal-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="h-10 w-10 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center shrink-0">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setEditingItem(item)}
                      className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => setDeletingId(item.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(item.created_at).toLocaleDateString()}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  ID: {item.id}
                </span>
              </div>
            </div>
          ))}
        </div>

      ) : (

        /* TABLE VIEW MATRIX */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="px-6 py-4">Specialization</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-teal-50/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                          <Stethoscope className="h-4 w-4" />
                        </div>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 max-w-md truncate">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-medium">
                      {new Date(item.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setEditingItem(item)}
                          className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-slate-100 rounded-lg"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => setDeletingId(item.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      )}

      {/* 6. EDIT SPECIALIZATION MODAL */}
      {editingItem && (
        <EditModal 
          item={editingItem} 
          onClose={() => setEditingItem(null)}
          onSave={(data) => updateMutation.mutate({ id: editingItem.id, data })}
          isPending={updateMutation.isPending}
        />
      )}

      {/* 7. DELETE CONFIRMATION DIALOG */}
      {deletingId && (
        <DeleteModal 
          onClose={() => setDeletingId(null)}
          onConfirm={() => deleteMutation.mutate(deletingId)}
          isPending={deleteMutation.isPending}
        />
      )}

    </div>
  );
}

// --- SUB-COMPONENTS FOR CLEAN STRUCTURE ---

function EditModal({ 
  item, 
  onClose, 
  onSave, 
  isPending 
}: { 
  item: Specialization; 
  onClose: () => void; 
  onSave: (data: { name: string; description: string }) => void;
  isPending: boolean;
}) {
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 text-teal-600 rounded-lg border border-teal-100">
              <Edit3 className="h-4 w-4" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm">Update Specialization</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Domain Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-teal-600/20 transition-all disabled:opacity-50"
            >
              {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{isPending ? 'Updating...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteModal({ 
  onClose, 
  onConfirm, 
  isPending 
}: { 
  onClose: () => void; 
  onConfirm: () => void; 
  isPending: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-sm p-6 text-center">
        <div className="h-12 w-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <AlertTriangle className="h-6 w-6" />
        </div>
        
        <h3 className="font-bold text-slate-900 text-base">Delete Specialization?</h3>
        <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
          Are you sure you want to remove this domain? This action cannot be undone if doctors are currently assigned.
        </p>

        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={onClose}
            className="w-1/2 py-2.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            className="w-1/2 flex items-center justify-center gap-2 py-2.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md shadow-rose-600/20 transition-all disabled:opacity-50"
          >
            {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            <span>{isPending ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}