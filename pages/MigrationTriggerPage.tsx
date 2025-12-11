import React, { useState } from 'react';
import { migrateContent } from '../services/migrateData';

const MigrationTriggerPage: React.FC = () => {
    const [status, setStatus] = useState('Idle');
    const [log, setLog] = useState<string[]>([]);

    const handleRunMigration = async () => {
        setStatus('Running...');
        setLog(prev => [...prev, 'Starting migration...']);
        try {
            await migrateContent();
            setStatus('Completed');
            setLog(prev => [...prev, 'Migration finished successfully!']);
        } catch (error) {
            setStatus('Error');
            setLog(prev => [...prev, `Error: ${error}`]);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-2xl font-bold mb-4">Database Migration Tool</h1>
            <p className="mb-4">Click below to populate Supabase with local data.ts content.</p>

            <button
                onClick={handleRunMigration}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={status === 'Running'}
            >
                {status === 'Running' ? 'Migrating...' : 'Run Migration'}
            </button>

            <div className="mt-8 border p-4 bg-gray-100 rounded">
                <h3 className="font-bold mb-2">Logs:</h3>
                {log.map((l, i) => <div key={i}>{l}</div>)}
            </div>

            {status === 'Completed' && (
                <div className="mt-4 text-green-600 font-bold">
                    Success! Check the news page.
                </div>
            )}
        </div>
    );
};

export default MigrationTriggerPage;
