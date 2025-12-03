
import { NewsArticle, Event, Business } from './types';

export const newsArticles: NewsArticle[] = [
    {
        id: 1,
        title: 'Nova praça inaugura no centro de Araucária',
        summary: 'A prefeitura inaugurou uma nova área de lazer no centro da cidade, com espaços para crianças e adultos.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsr0wWkZtR6kL_hQ6Wj-Q3GovX77Ygwm2Gq5N8qeNXI9GsI-gDs6nL4wnktnda9xf_UN6KBiwQ7OAS12L6SbSOMfYPHLguYkSERxtlAfifZIJJm-b_CsgzUpZTz7Tk9Y1vHbqXdbtKfhrAp_TJOkL_hTa-f970gacksLUFOj9auAqpVRBi0kvfbyRBmirNx3DPmNyLo2PgHxA2VCudAJGyuh1NPNOHoWVi_ZmcJXLxKvfPfZz2igUBTgXE26-cjTYLWtmDYvgtq5Jc',
        category: 'Cidade',
        categoryColor: 'blue',
        publishDate: 'Publicado hoje'
    },
    {
        id: 2,
        title: 'Centro histórico recebe nova iluminação',
        summary: 'Projeto de revitalização traz modernidade preservando a arquitetura histórica da região central.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCN3YWaCsFt_OTMDjUa2ZUNaCUAA_zJnF_le429_gJjgu6sdnDGfPSNoyjECP1K2K6HxqhEcZsjH7Yuok6xdqkPUFEHNs4Gpyhv4bfZWDfCzB34SDAg99wrHoq_PV2_9OuUnzW48BxDBaOLQ0yEAZkDU-7yO_2AfT-tO-JnCItQ7sAfRKHNyl6N3G6Cx80eLSfTC57HrWHZwnQCSYECrbYeJ1N9ZqhgnIt4TQ_G3TlD7P6nZSHCtjkTvHQVRajS0oCbqaJoupx1VK94',
        category: 'Infraestrutura',
        categoryColor: 'purple',
        publishDate: 'Publicado ontem'
    },
    {
        id: 3,
        title: 'Time de Futebol de Araucária conquista Campeonato Regional',
        summary: 'Equipe local vence final por 3 a 1 e leva o título para casa após 5 anos.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3YJlMCCNQFSocPQ9rLLf5qBoFOSyNuZxfgh4BgK8GKJIlXzTLPQCx6aQNAGlJhS5bBTIHb-J7qx3OX49pXVqOKkA7-sQa8Ytw79Cb7cry3JVHDPbrlADzOy6z066Lk56Yg_D7wzWV6RUxgweeMK9RAW_VCltdt1xwWSSbeCYgGLXjHhe3718gnUxA5949u4t-Rv0hOhEwIze3kqyuGEgo-hTdNK3Oevjr87yEbnvf0Ogh4QLPM_8iqsGMkR8q0Nid6fMPzuzgfMiI',
        category: 'Esporte',
        categoryColor: 'green',
        publishDate: '01/12/2025'
    },
    {
        id: 4,
        title: 'Academia de Jiu-Jitsu de Araucária forma novos faixas-pretas',
        summary: 'Cerimônia de graduação reconhece dedicação de 4 atletas locais nas artes marciais.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCa3u6lMkOcV_I6Xgf_8Zitc7trWJMaflFNbmknQ_8WuNLhO0pX9TVRrcT8raKwVF9lAPLmqwOPhTzslbcDSYjeH08N-XlEARELkyLJFygcHbkZ9d4Xyn2hf4Wpmhe4rrLz4fZOaYRPJC__6cHFnjUdEEBC7cLSygjs-mNaLA1EtZUCRWU4puGdADB-GO_3iX_rSBgDcf_ZNDdpJ_MN-eXDBuCpUkCGlsk5HUfl8LphToQu5kZIPiPeQfolzqVXsVzhF_0vhRWZ7z00',
        category: 'Artes Marciais',
        categoryColor: 'red',
        publishDate: '30/11/2025'
    },
    {
        id: 5,
        title: 'Araucária recebe programa de inclusão digital para idosos',
        summary: 'Prefeitura oferece cursos gratuitos de informática e uso de smartphones.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAguq0xUkhGZf4YYeiO1_gIxfDEzWrnoT1e3Sr6gKmEDKqQOIjqv79uOg0njl0Fb2DfnUj4uuxd0uX52kQOqYD35ep4GR8GB8fnj2heWr4DYsKZZ5BjRIyxwiuwG7x7QGjiS-3H09Z42qxvKeQdwchE7TQA-8H_iLHCQ0ohu_77QKt0Vz5nzi6da5swy_zBmcOxlYvbqaB0QnNVQg4dIJMk8bDKfV7KdgrS4dPQ309sRWLv1VlCR6L9pQhesmj13mGGj_AOiQGE10-g',
        category: 'Tecnologia',
        categoryColor: 'yellow',
        publishDate: '29/11/2025'
    },
    {
        id: 6,
        title: 'Nova lei municipal facilita abertura de microempresas em Araucária',
        summary: 'Medida reduz burocracia e tempo de tramitação para empreendedores locais.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXIJCB4jZfAcRD8sAlw4Kd1VmCKyOdO_400EX2ojQN-VeY8k_WVRRqOm1uRSkA8EPVEGPh8TG7csweEWYiBw7CCIxeEMxmjmuK_7i9dq1tflnc9tk9x1LjHKxFBeI4A2n8_8Gtn2BbZZfYl0bNerhwKyZMCmwVkL-_HzH9ltLAHZqm3SKSBkINDz-1Thl02uxO7tryJbDGLEXPoL7r54DD84X4cwCIHMpOrpUnvJ3ee6QxrTx4Vz4YkuaoXnNu5O1aCwjthcNMWEQp',
        category: 'Políticas Públicas',
        categoryColor: 'indigo',
        publishDate: '28/11/2025'
    }
];

export const events: Event[] = [
    {
        id: 1,
        title: 'Festival de Música de Araucária 2025',
        description: 'Três dias de música ao vivo com artistas locais e nacionais. Entrada gratuita para todos.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfdq6MEM07q2F9ogCrLg6ZRbtyvhBuesR3W85QHOUtNEL5B0EGTWh0L06-n0oRFXNvmpN1fBY8HPcMFE-U_HEe6TfxMb0J37pHEsGPGtc5y73Er7y2BybhdqhbjxwLD03wizXIKKDc067pP-33MvhiWuLsgENkqigc-EPcqwJ8aYKMwTQnFkYhAPqIYD92WLVNBI85wN_4Wws2DOJXXtzZiCCrCvyqsJ6nRVqwcgi7EhgZhlP9FDmpNjrekTDn90ZvE1PR6xdgiMKP',
        time: '18:00 - 23:00',
        location: 'Praça Central'
    },
    {
        id: 2,
        title: 'Feira Gastronômica Sabores da Terra',
        description: 'Experimente o melhor da culinária local com dezenas de food trucks e barracas. Música ao vivo todos os dias.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALui4pPDI-DL-krrPRi-KFZPqc55LG_SMkNjD-deXlaqDt4vvTBMXlLTHvZvNY2TzmYdNpYGuiP3Lun6AXLBcKMMLfYijq1kdkxhtXeyTDdOC-Mhx2dvmSvxVYYyK2axgCaH118hkmyg8KpIYGgO00_rdspQDmzjXodF94E8eq6JOpqkGVxTy-94rfR2rJyB54CV4NII1t2A7RWUobmoInXtAmGWkuHqewiMCa_iSaWT79HFSIUEdYvQm9ZeRRuImyvhnJ3paqERjr',
        time: 'Sáb e Dom, 11:00 - 22:00',
        location: 'Parque Cachoeira'
    },
    {
        id: 3,
        title: 'Cinema ao Ar Livre',
        description: 'Sessões de cinema gratuitas sob as estrelas. Traga sua cadeira e pipoca para uma noite de clássicos do cinema.',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA16hOqDHU1TK-jtJI_WgBysnLftMPjfXoSARUZmnJZVoBDZfI7CzLlR-Zqj4I00Xi6h2-33cai-IMupcGbCbDq9mOXV6Okl1e78wjMCLa3NglEBQkDRrrXXO0rIpfKWrzAMYB-GiDE_DrL1rs9UJr8UR_W_dgqO0FOwvZA5hv91Y-gF9NmjedFLGnmW5_GQCE8CT_YN6D0CijrXb82oYwtJzFKr7grkp_O2sjILXZSikcFuEwrN1e0dCu9FdTBDVgX5W4F2nMHteZ',
        time: 'Sextas, às 19:30',
        location: 'Anfiteatro do Lago'
    }
];

export const businesses: Business[] = [
    {
        id: 1,
        name: 'Padaria Central',
        category: 'Alimentação',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZX0ukfJeJS_ogwlO5taL9gABJzxRqM2hl1-FYLhJ4NXCru5eay7J35cGl5TMZMrCmM9rdphbil7jK2i7H3F_ZVYR72XIwmgQZHEDn_2JOQAfo5eBBuMQPTz4YrQGdYFgphg88nIGmbxEoqJxvrHPTzsZP3fyf2vX-ptK_IuoM1j0f59o-3fCkfZte0jHsnjQBqTfhzU16W8MTPJzL37FCKnRNwuOffUMf2tCAVH81VMQ_wKjNMNi9LSbmNGEB_cZzygot99MK7w7h',
        address: 'Rua Principal, 123 - Centro',
        phone: '(41) 3901-2345',
        website: 'padaria-central.com.br'
    },
    {
        id: 2,
        name: 'Livraria Saber',
        category: 'Varejo',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7Fd06GyXJ6RhL5MoZAXe6LAYf5JBsdid0GoHMZtTtXcsZLJ7QorvwzVC7j-RoPQcAx8PFj8Ajf6KKs9_u6zdNkfD-zEwn9K2YtOyED8RLSEFZSQvmsVEiVQbuiKEfO7vuKxdsHkjT62Ulx_JTghfP_UfToCWq0BcyhClwqMhjQRrvR79wpPSiFlRhTKTtfFQOFEnJQcD-QFs5_GM6_8VIQk97S-c04RzOI0dUCr8eEEjzeIQ4CY3zLqClOcMY67S53DbE9c040stM',
        address: 'Av. do Conhecimento, 456',
        phone: '(41) 3901-6789',
        website: 'livrariasaber.com.br'
    },
    {
        id: 3,
        name: 'Oficina Auto Rápida',
        category: 'Serviços',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBoKHgLHzCbN-ApLbtOloEW5VdWMEeXcttxit9aISQnYf-p7nHVG4cuAPoCneFngJ32qtb8XW4102X0i5rjfnY_ft1z7A1K-LSG9Gf3sxsAAXFXbHk3SH4gNGOBxHoa_UAqKySeAitPFmcKagqOjyjY2TXkqtcJ0rKKWANOnuLf7MDS697exPHiPPwGotaKJKzBcmGKZjxEuX8gIdow62Vvj2kunYbUi_NGyAc5RL_GybA9AtrXI2u3ynQCIoLEW7-WlzYa0X9wVIy',
        address: 'Rua dos Motores, 789',
        phone: '(41) 3901-1011',
        website: 'autorapida.com.br'
    }
];

export const allNewsCategories = ['Todas', 'Cidade', 'Infraestrutura', 'Esporte', 'Artes Marciais', 'Tecnologia', 'Políticas Públicas'];
export const allBusinessCategories = ['Todas', 'Alimentação', 'Serviços', 'Varejo'];
