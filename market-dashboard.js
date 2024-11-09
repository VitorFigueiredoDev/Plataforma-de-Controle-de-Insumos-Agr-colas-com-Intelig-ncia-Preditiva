// market-dashboard.js

'use strict';

const e = React.createElement;

const MarketDashboard = () => {
    // Dados de mercado
    const marketData = {
        currentPrice: 92.45,
        previousPrice: 89.30,
        priceChange: 3.15,
        priceChangePercent: 3.53,
        forecast: [
            { month: 'Nov', price: 92.45, volume: 1500 },
            { month: 'Dez', price: 94.20, volume: 1800 },
            { month: 'Jan', price: 95.80, volume: 2100 },
            { month: 'Fev', price: 93.50, volume: 1900 },
            { month: 'Mar', price: 96.40, volume: 2300 }
        ],
        alerts: [
            { text: 'Tendência de alta nos preços para o próximo trimestre', type: 'positive' },
            { text: 'Grande volume de exportações previsto', type: 'positive' },
            { text: 'Atenção: Possível variação cambial pode afetar preços', type: 'warning' }
        ]
    };

    return e('div', { className: 'market-dashboard p-6' },
        // Título da seção
        e('div', { className: 'dashboard-header' },
            e('h2', { className: 'dashboard-title' },
                e('i', { className: 'fas fa-chart-line' }),
                ' Dashboard de Mercado - Milho'
            )
        ),

        // Cards de indicadores
        e('div', { className: 'indicators-grid' },
            // Preço Atual
            e('div', { className: 'indicator-card' },
                e('div', { className: 'indicator-title' }, 'Preço Atual (saca 60kg)'),
                e('div', { className: 'indicator-value' }, 
                    `R$ ${marketData.currentPrice.toFixed(2)}`
                ),
                e('div', { className: 'indicator-change positive' },
                    e('i', { className: 'fas fa-arrow-up' }),
                    ` ${marketData.priceChangePercent.toFixed(2)}%`
                )
            ),

            // Preço Anterior
            e('div', { className: 'indicator-card' },
                e('div', { className: 'indicator-title' }, 'Preço Anterior (saca 60kg)'),
                e('div', { className: 'indicator-value' }, 
                    `R$ ${marketData.previousPrice.toFixed(2)}`
                )
            ),

            // Variação de Preço
            e('div', { className: 'indicator-card' },
                e('div', { className: 'indicator-title' }, 'Variação de Preço'),
                e('div', { className: 'indicator-value' }, 
                    `R$ ${marketData.priceChange.toFixed(2)}`
                )
            )
        ),

        // Alertas de Mercado
        e('div', { className: 'alerts-section' },
            e('h3', { className: 'section-title' },
                e('i', { className: 'fas fa-bell' }),
                ' Alertas de Mercado'
            ),
            e('div', { className: 'alerts-container' },
                marketData.alerts.map((alert, index) =>
                    e('div', {
                        key: index,
                        className: `alert-item ${alert.type}`
                    },
                        e('i', { 
                            className: alert.type === 'positive' 
                                ? 'fas fa-arrow-trend-up' 
                                : 'fas fa-triangle-exclamation' 
                        }),
                        ' ' + alert.text
                    )
                )
            )
        ),

        // Tabela de Previsões
        e('div', { className: 'forecast-section' },
            e('h3', { className: 'section-title' },
                e('i', { className: 'fas fa-table' }),
                ' Previsão de Preços e Volume'
            ),
            e('div', { className: 'table-container' },
                e('table', { className: 'forecast-table' },
                    e('thead', {},
                        e('tr', {},
                            e('th', {}, 'Mês'),
                            e('th', {}, 'Preço (R$)'),
                            e('th', {}, 'Volume')
                        )
                    ),
                    e('tbody', {},
                        marketData.forecast.map((entry, index) =>
                            e('tr', { key: index },
                                e('td', {}, entry.month),
                                e('td', {}, `R$ ${entry.price.toFixed(2)}`),
                                e('td', {}, entry.volume.toLocaleString())
                            )
                        )
                    )
                )
            )
        )
    );
};

// Inicialização do componente
document.addEventListener('DOMContentLoaded', () => {
    const domContainer = document.querySelector('#market-root');
    const root = ReactDOM.createRoot(domContainer);
    root.render(e(MarketDashboard));
});