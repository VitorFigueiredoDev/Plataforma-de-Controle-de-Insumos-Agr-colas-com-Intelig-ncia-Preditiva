// Dados simulados para cultura de milho
const dadosSolo = {
    ph: 5.2, // pH baixo - situação de alerta
    umidade: 65,
    nutrientes: {
        nitrogenio: 35, // Nitrogênio baixo - situação de alerta
        fosforo: 45,
        potassio: 80,
    },
    historico: [
        { data: '01/11', umidade: 70 },
        { data: '02/11', umidade: 65 },
        { data: '03/11', umidade: 63 },
        { data: '04/11', umidade: 60 },
        { data: '05/11', umidade: 62 },
        { data: '06/11', umidade: 65 },
        { data: '07/11', umidade: 64 }
    ]
};

const dadosClima = {
    temperatura: 25,
    umidadeAr: 65,
    probabilidadeChuva: 30,
    previsao: [
        { dia: 'Segunda', temp: 25, prob: 30 },
        { dia: 'Terça', temp: 27, prob: 20 },
        { dia: 'Quarta', temp: 26, prob: 45 },
        { dia: 'Quinta', temp: 24, prob: 80 },
        { dia: 'Sexta', temp: 23, prob: 90 }
    ]
};

function atualizarIndicadores() {
    document.getElementById('ph').textContent = dadosSolo.ph;
    document.getElementById('umidade').textContent = dadosSolo.umidade;
    document.getElementById('nitrogenio').textContent = dadosSolo.nutrientes.nitrogenio;
    document.getElementById('fosforo').textContent = dadosSolo.nutrientes.fosforo;
    document.getElementById('potassio').textContent = dadosSolo.nutrientes.potassio;
    document.getElementById('temperatura').textContent = dadosClima.temperatura;
    document.getElementById('umidadeAr').textContent = dadosClima.umidadeAr;
    document.getElementById('probChuva').textContent = dadosClima.probabilidadeChuva;
}

function gerarRecomendacoes() {
    const recomendacoes = [];
    
    // Recomendações específicas para milho com alertas
    if (dadosSolo.ph < 6.0) {
        recomendacoes.push({
            texto: 'URGENTE: Necessário correção do pH do solo com calcário. pH atual muito baixo para o milho.',
            alert: true
        });
    }
    if (dadosSolo.nutrientes.nitrogenio < 40) {
        recomendacoes.push({
            texto: 'URGENTE: Aplicar fertilizante nitrogenado. Níveis críticos para o desenvolvimento do milho.',
            alert: true
        });
    }
    if (dadosSolo.umidade < 60) {
        recomendacoes.push({
            texto: 'Programar irrigação para os próximos dias',
            alert: false
        });
    }
    recomendacoes.push({
        texto: 'Monitorar pragas comum do milho: lagarta-do-cartucho e percevejo',
        alert: false
    });

    const lista = document.getElementById('listaRecomendacoes');
    lista.innerHTML = recomendacoes.map(rec => 
        `<li class="${rec.alert ? 'alert' : ''}">
            ${rec.alert ? '<i class="fas fa-exclamation-circle"></i>' : '<i class="fas fa-check-circle"></i>'}
            ${rec.texto}
        </li>`
    ).join('');
}

function inicializarGraficos() {
    Chart.defaults.color = '#9fa3a9';
    Chart.defaults.font.family = "'Segoe UI', system-ui, sans-serif";
    Chart.defaults.font.size = 13;

    new Chart(document.getElementById('graficoUmidade').getContext('2d'), {
        type: 'line',
        data: {
            labels: dadosSolo.historico.map(item => item.data),
            datasets: [{
                label: 'Umidade do Solo (%)',
                data: dadosSolo.historico.map(item => item.umidade),
                borderColor: '#4a9f3b',
                backgroundColor: 'rgba(74, 159, 59, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });

    new Chart(document.getElementById('graficoPrevisao').getContext('2d'), {
        type: 'bar',
        data: {
            labels: dadosClima.previsao.map(item => item.dia),
            datasets: [
                {
                    label: 'Temperatura (°C)',
                    data: dadosClima.previsao.map(item => item.temp),
                    borderColor: '#ff9f1a',
                    backgroundColor: 'rgba(255, 159, 26, 0.5)',
                    yAxisID: 'y'
                },
                {
                    label: 'Probabilidade de Chuva (%)',
                    data: dadosClima.previsao.map(item => item.prob),
                    borderColor: '#4a90e2',
                    backgroundColor: 'rgba(74, 144, 226, 0.5)',
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperatura (°C)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y1: {
                    type: 'linear',
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Probabilidade (%)'
                    },
                    min: 0,
                    max: 100,
                    grid: {
                        drawOnChartArea: false
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });
}

// Inicialização do dashboard
document.addEventListener('DOMContentLoaded', () => {
    atualizarIndicadores();
    gerarRecomendacoes();
    inicializarGraficos();
});

// Atualização periódica (a cada 5 minutos)
setInterval(() => {
    atualizarIndicadores();
    gerarRecomendacoes();
}, 300000);

function updateClock() {
const now = new Date();
const timeString = now.toLocaleTimeString('pt-BR', {
hour: '2-digit',
minute: '2-digit',
second: '2-digit'
});
document.getElementById('clock').textContent = timeString;
}

// Atualizar o relógio a cada segundo
setInterval(updateClock, 1000);
updateClock(); // Chamada inicial

function updateMoistureLevel(zoneId, value) {
const moistureLevel = document.querySelector(`#${zoneId} .moisture-level`);
moistureLevel.style.height = `${value}%`;
}

// Função para alternar dias ativos
document.querySelectorAll('.day').forEach(day => {
day.addEventListener('click', () => {
day.classList.toggle('active');
});
});

// Atualização simulada dos níveis de umidade
setInterval(() => {
const randomValue = Math.floor(Math.random() * 30) + 40; // Valores entre 40-70%
updateMoistureLevel('zone1', randomValue);
}, 5000);
