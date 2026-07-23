import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import DataTable from '../../components/admin/DataTable';
import LoadingState from '../../components/admin/LoadingState';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await adminService.getAuditLogs({});
        setLogs(response.data?.logs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const columns = [
    { header: 'Action', accessor: 'action' },
    { header: 'Actor', render: (row) => row.actor?.email || 'System' },
    { header: 'Date', render: (row) => new Date(row.createdAt).toLocaleString() },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? <LoadingState /> : <DataTable columns={columns} data={logs} keyField="_id" />}
      </div>
    </div>
  );
};
export default AuditLogs;
