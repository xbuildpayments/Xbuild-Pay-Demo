import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Lock } from "lucide-react";

export default function PermissionGuard({ children, requiredPermission, fallback }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const user = await base44.auth.me();
        
        if (user.role === 'admin') {
          setHasPermission(true);
          setLoading(false);
          return;
        }

        if (user.permissions && user.permissions[requiredPermission]) {
          setHasPermission(true);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Permission check failed", err);
        setLoading(false);
      }
    };

    checkPermission();
  }, [requiredPermission]);

  if (loading) {
    return <div style={{ color: 'var(--muted)' }}>Checking permissions...</div>;
  }

  if (!hasPermission) {
    if (fallback) {
      return fallback;
    }
    return (
      <div className="rounded-xl p-8 text-center" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
        <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--muted)' }} />
        <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
          Access Restricted
        </p>
        <p style={{ color: 'var(--muted)' }}>
          You don't have permission to access this feature.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}