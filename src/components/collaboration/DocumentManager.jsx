import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, FileText, Download, Share2, Trash2, Eye, Lock, Unlock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";

export default function DocumentManager({ projectId }) {
  const [uploading, setUploading] = useState(false);
  const [shareDialogDoc, setShareDialogDoc] = useState(null);
  const [shareEmail, setShareEmail] = useState("");
  const queryClient = useQueryClient();

  const { data: documents, isLoading } = useQuery({
    queryKey: ['documents', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      return await base44.entities.Document.filter({ project_id: projectId }, '-created_date');
    },
    initialData: [],
  });

  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      return await base44.entities.Document.create({
        project_id: projectId,
        document_name: file.name,
        document_type: 'other',
        file_url,
        file_size: file.size,
        mime_type: file.type,
        status: 'published',
        shared_with: [],
        tags: []
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', projectId] });
      setUploading(false);
    },
  });

  const shareMutation = useMutation({
    mutationFn: async ({ docId, email }) => {
      const doc = documents.find(d => d.id === docId);
      const sharedWith = [...(doc.shared_with || []), email];
      return await base44.entities.Document.update(docId, { shared_with: sharedWith });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', projectId] });
      setShareDialogDoc(null);
      setShareEmail("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (docId) => {
      return await base44.entities.Document.delete(docId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents', projectId] });
    },
  });

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    uploadMutation.mutate(file);
  };

  const handleShare = (docId) => {
    if (!shareEmail) return;
    shareMutation.mutate({ docId, email: shareEmail });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl p-6" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{ color: 'var(--text)' }}>Project Documents</h3>
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <Button
              as="span"
              disabled={uploading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </label>
        </div>

        {isLoading ? (
          <div className="text-center py-8" style={{ color: 'var(--muted)' }}>Loading documents...</div>
        ) : documents.length === 0 ? (
          <div className="text-center py-8" style={{ color: 'var(--muted)' }}>
            No documents yet. Upload your first document!
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-lg p-4 flex items-center justify-between"
                  style={{ background: 'var(--panelAlt)', border: '1px solid var(--line)' }}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: 'var(--text)' }}>{doc.document_name}</p>
                      <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                        <span>{format(new Date(doc.created_date), 'MMM d, yyyy')}</span>
                        <span>•</span>
                        <span>{(doc.file_size / 1024).toFixed(1)} KB</span>
                        {doc.shared_with && doc.shared_with.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Share2 className="w-3 h-3" />
                              Shared with {doc.shared_with.length}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(doc.file_url, '_blank')}
                      className="rounded-lg"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShareDialogDoc(doc)}
                      className="rounded-lg"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (confirm('Delete this document?')) {
                          deleteMutation.mutate(doc.id);
                        }
                      }}
                      className="rounded-lg text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {shareDialogDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-8"
            onClick={() => setShareDialogDoc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-xl p-6 max-w-md w-full"
              style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
            >
              <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text)' }}>
                Share Document
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                Share "{shareDialogDoc.document_name}" with team members
              </p>
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={shareEmail}
                  onChange={(e) => setShareEmail(e.target.value)}
                  className="rounded-lg"
                  style={{
                    background: 'var(--panelAlt)',
                    border: '1px solid var(--line)',
                    color: 'var(--text)'
                  }}
                />
                <div className="flex gap-3">
                  <Button
                    onClick={() => setShareDialogDoc(null)}
                    variant="outline"
                    className="flex-1 rounded-lg"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleShare(shareDialogDoc.id)}
                    disabled={!shareEmail || shareMutation.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}