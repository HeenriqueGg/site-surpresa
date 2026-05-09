// supabase.js - Integração com Supabase (versão simulada/fallback)
const supabaseConfig = {
    url: 'https://seuprojeto.supabase.co',
    key: 'sua-chave-publica',
    bucketPhotos: 'fotos-mae',
    bucketVideos: 'videos-mae',
    tableMessages: 'mensagens'
};

// Classe para gerenciar dados do Supabase ou fallback local
class SupabaseManager {
    constructor() {
        this.supabase = null;
        this.initialized = false;
        try {
            if (window.supabase && supabaseConfig.url && supabaseConfig.key) {
                const { createClient } = window.supabase;
                this.supabase = createClient(supabaseConfig.url, supabaseConfig.key);
                this.initialized = true;
                console.log('Supabase inicializado.');
            }
        } catch (e) {
            console.warn('Supabase não disponível, usando dados locais.');
        }
    }

    async fetchPhotos() {
        if (this.supabase) {
            const { data, error } = await this.supabase.storage.from(supabaseConfig.bucketPhotos).list();
            if (!error && data) {
                return data.map(file => ({
                    src: `${supabaseConfig.url}/storage/v1/object/public/${supabaseConfig.bucketPhotos}/${file.name}`,
                    caption: file.name
                }));
            }
        }
        return []; // fallback vazio, o config.json já tem exemplos
    }

    async fetchMessages() {
        if (this.supabase) {
            const { data, error } = await this.supabase.from(supabaseConfig.tableMessages).select('*');
            if (!error && data) return data;
        }
        return [];
    }

    async fetchVideos() {
        if (this.supabase) {
            const { data, error } = await this.supabase.storage.from(supabaseConfig.bucketVideos).list();
            if (!error && data) {
                return data.map(file => ({
                    src: `${supabaseConfig.url}/storage/v1/object/public/${supabaseConfig.bucketVideos}/${file.name}`,
                    title: file.name
                }));
            }
        }
        return [];
    }
}

// Instância global
window.supabaseManager = new SupabaseManager();