import { Job } from '../data-jobs';
import { getSupabase } from './supabaseClient';


/**
 * Singleton Class para Lógica de Negócios de Vagas.
 */
class JobsService {
    private static instance: JobsService;

    private constructor() { }

    public static getInstance(): JobsService {
        if (!JobsService.instance) {
            JobsService.instance = new JobsService();
        }
        return JobsService.instance;
    }

    public filterActiveJobs(jobs: Job[]): Job[] {
        // Por enquanto retorna tudo, mas aqui poderíamos filtrar por data de validade
        return jobs || [];
    }

    public getTypeColor(type: string): string {
        switch (type) {
            case 'CLT': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200';
            case 'Estágio': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200';
            case 'PJ': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200';
            case 'Temporário': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
            default: return 'bg-green-100 text-green-800';
        }
    }

    public async addJob(jobData: Omit<Job, 'id' | 'date'>): Promise<boolean> {
        try {
            const supabase = await getSupabase();
            const { error } = await supabase.from('jobs').insert({
                title: jobData.title,
                company: jobData.company,
                description: jobData.description,
                salary: jobData.salary,
                type: jobData.type,
                location: jobData.location,
                contact_link: jobData.contactLink,
                requirements: jobData.requirements || []
            });

            if (error) {
                console.error("Erro ao adicionar vaga:", error);
                return false;
            }
            return true;
        } catch (e) {
            console.error("Exceção ao adicionar vaga:", e);
            return false;
        }
    }
}

export const jobsService = JobsService.getInstance();
