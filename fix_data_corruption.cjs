
const fs = require('fs');
const content = fs.readFileSync('data.ts', 'utf8');

// O bloco correto
const correctBlock = `    {
        id: 1769253501,
        title: "Araucária Vôlei vence em casa e assume a liderança",
        summary: "Em uma partida eletrizante no Ginásio Joval de Paula Souza, o time da casa venceu o Maringá por 3 sets a 1 e assumiu o topo da tabela.",
        content: \`
        <p><strong>ARAUCÁRIA</strong> - A noite foi histórica no Ginásio Joval de Paula Souza. Com o apoio massivo da torcida que lotou as arquibancadas, o Araucária Vôlei venceu o Maringá Vôlei por 3 sets a 1 (parciais de 25/22, 19/25, 25/20 e 25/18) e assumiu a liderança isolada do Campeonato Paranaense.</p>
        
        <p>O destaque da partida foi o ponteiro Lucas, maior pontuador com 22 acertos. "A energia dessa torcida é surreal. Eles jogaram junto com a gente do primeiro ao último ponto", declarou o atleta ao fim do jogo.</p>

        <h3>Rumo ao Título</h3>
        <p>Com o resultado, a equipe chega aos 35 pontos e abre vantagem sobre o segundo colocado. O próximo desafio será fora de casa, mas a confiança do elenco nunca esteve tão alta. O técnico Fabiano Ribeiro pede pés no chão: "Faltam três rodadas. É manter o foco e garantir essa taça para nossa cidade".</p>
        \`,
        imageUrl: '/images/volei-araucaria-lider-capa.jpg',`;

// Regex para achar o inicio do bloco quebrado até a imagem
// Começa com id:... volei... e vai até imageUrl:... volei...
const regex = /\{\s*id: 1769253501,[\s\S]*?imageUrl: '\/images\/volei-araucaria-lider-capa.jpg',/;

if (regex.test(content)) {
    const newContent = content.replace(regex, correctBlock);
    fs.writeFileSync('data.ts', newContent);
    console.log('Fixed Volei news block corruption.');
} else {
    console.log('Could not find corrupted block pattern. Dumping snippet for debug:');
    const idx = content.indexOf('id: 1769253501');
    if (idx !== -1) {
        console.log(content.substring(idx, idx + 500));
    } else {
        console.log('ID 1769253501 not found.');
    }
}
