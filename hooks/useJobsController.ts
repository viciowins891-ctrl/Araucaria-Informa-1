import { useEffect, useMemo } from 'react';
import { api } from '../services/api';
import { useFetch } from './useFetch';
import { jobsService } from '../services/JobsService';
import { Job } from '../data-jobs';

interface JobsController {
    jobs: Job[];
    loading: boolean;
    error: string | null;
    getTypeColor: (type: string) => string;
}

/**
 * Maestro Central (Custom Hook) para a Página de Vagas.
 */
export const useJobsController = (): JobsController => {
    // 1. Data Fetching
    const { data, loading, error } = useFetch(api.getJobs);

    // 2. Side Effects
    useEffect(() => {
        document.title = "Vagas de Emprego em Araucária - Araucária Informa";
        window.scrollTo(0, 0);
    }, []);

    // 3. Business Logic
    const activeJobs = useMemo(() => {
        return jobsService.filterActiveJobs(data || []);
    }, [data]);

    return {
        jobs: activeJobs,
        loading,
        error,
        getTypeColor: jobsService.getTypeColor
    };
};
