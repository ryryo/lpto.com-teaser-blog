document.addEventListener('DOMContentLoaded', () => {
  // 実績データの定義
  const performanceData = {
    // 月間売上データ
    monthlySales: {
      labels: ['1月', '2月', '3月', '4月', '5月', '6月'],
      datasets: [{
        label: '売上高（万円）',
        data: [120, 190, 300, 250, 280, 350],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    
    // カテゴリ別売上構成
    categorySales: {
      labels: ['製品A', '製品B', '製品C', '製品D'],
      datasets: [{
        data: [35, 25, 22, 18],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ],
        borderWidth: 1
      }]
    },
    
    // 年間成長率
    growthRate: {
      labels: ['2019', '2020', '2021', '2022', '2023'],
      datasets: [{
        label: '成長率（%）',
        data: [5, 8, 12, 18, 25],
        fill: false,
        borderColor: 'rgba(153, 102, 255, 1)',
        tension: 0.4
      }]
    },
    
    // サロン業種別効果シミュレーション - ネイルサロン
    nailSalon: {
      labels: ['導入前', '1ヶ月後', '3ヶ月後', '6ヶ月後'],
      datasets: [
        {
          label: '新規顧客数',
          data: [100, 120, 130, 135],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          tension: 0.4
        },
        {
          label: '売上高',
          data: [100, 115, 130, 142],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          tension: 0.4
        }
      ]
    },
    
    // サロン業種別効果シミュレーション - アイラッシュサロン
    eyelashSalon: {
      labels: ['導入前', '1ヶ月後', '3ヶ月後', '6ヶ月後'],
      datasets: [
        {
          label: '新規顧客数',
          data: [100, 110, 122, 128],
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
          tension: 0.4
        },
        {
          label: '売上高',
          data: [100, 112, 125, 133],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          tension: 0.4
        }
      ]
    }
  };

  // グラフの設定オプション
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  // 棒グラフ（売上推移）
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  const salesChart = new Chart(salesCtx, {
    type: 'bar',
    data: performanceData.monthlySales,
    options: {
      ...chartOptions,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '売上高（万円）'
          }
        }
      }
    }
  });

  // 円グラフ（カテゴリ分析）
  const categoryCtx = document.getElementById('categoryChart').getContext('2d');
  const categoryChart = new Chart(categoryCtx, {
    type: 'pie',
    data: performanceData.categorySales,
    options: {
      ...chartOptions,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            boxWidth: 15,
            padding: 15
          }
        }
      }
    }
  });

  // 折れ線グラフ（成長率）
  const growthCtx = document.getElementById('growthChart').getContext('2d');
  const growthChart = new Chart(growthCtx, {
    type: 'line',
    data: performanceData.growthRate,
    options: {
      ...chartOptions,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '成長率（%）'
          }
        }
      }
    }
  });

  // サロン業種別効果シミュレーショングラフの作成
  const caseGraphs = document.querySelectorAll('.case__graph');
  
  if (caseGraphs.length > 0) {
    // キャンバス要素を追加
    caseGraphs.forEach((graphContainer, index) => {
      const canvasId = `caseChart${index + 1}`;
      graphContainer.innerHTML = `<canvas id="${canvasId}"></canvas>`;
      
      // グラフデータの設定
      const ctx = document.getElementById(canvasId).getContext('2d');
      const dataKey = index === 0 ? 'nailSalon' : 'eyelashSalon';
      
      new Chart(ctx, {
        type: 'line',
        data: performanceData[dataKey],
        options: {
          ...chartOptions,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 10,
                font: {
                  size: 11
                }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    if (context.dataIndex === 0) {
                      label += context.parsed.y;
                    } else {
                      const baseValue = context.dataset.data[0];
                      const increase = Math.round((context.parsed.y - baseValue) / baseValue * 100);
                      label += `${context.parsed.y} (${increase > 0 ? '+' : ''}${increase}%)`;
                    }
                  }
                  return label;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: false,
              min: 80,
              ticks: {
                callback: function(value) {
                  if (value === 100) {
                    return '基準値(100)';
                  }
                  return value;
                }
              }
            }
          }
        }
      });
    });
  }

  // タブ切り替え用の処理
  const tabBtns = document.querySelectorAll('.tabbed-charts .tab-btn');
  const graphItems = document.querySelectorAll('.tabbed-charts .graph-item');

  // タブボタンのクリックイベント
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // アクティブクラスの切り替え
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // グラフの表示切り替え
      const graphId = btn.getAttribute('data-graph');
      graphItems.forEach(item => {
        item.classList.remove('active');
      });
      document.getElementById(`${graphId}-graph`).classList.add('active');
    });
  });

  // グラフの表示アニメーション
  const graphsSection = document.querySelector('.performance-graphs');
  const casesSection = document.querySelector('.cases');
  
  // IntersectionObserverの設定
  const graphObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 表示されたセクションにアニメーションクラスを追加
        entry.target.classList.add('animated');
        
        // 一度表示されたら監視を解除
        graphObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  // 監視対象の要素を設定
  if (graphsSection) {
    graphObserver.observe(graphsSection);
  }
  
  if (casesSection) {
    graphObserver.observe(casesSection);
  }
});

// グラフ初期化関数
function initCharts() {
  // 売上グラフ
  const salesCtx = document.getElementById('salesChart').getContext('2d');
  new Chart(salesCtx, {
    type: 'line',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024(予測)'],
      datasets: [{
        label: '年間売上(百万円)',
        data: [12, 19, 32, 45, 65],
        borderColor: '#4E31AA',
        backgroundColor: 'rgba(78, 49, 170, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });

  // カテゴリ分析グラフ
  const categoryCtx = document.getElementById('categoryChart').getContext('2d');
  new Chart(categoryCtx, {
    type: 'doughnut',
    data: {
      labels: ['ネイルサロン', 'アイラッシュサロン', '美容室', 'エステサロン', 'その他'],
      datasets: [{
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          '#4E31AA',
          '#7F5AD8',
          '#AC83FF',
          '#D9C6FF',
          '#EFE9FF'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        }
      }
    }
  });

  // 成長率グラフ
  const growthCtx = document.getElementById('growthChart').getContext('2d');
  new Chart(growthCtx, {
    type: 'bar',
    data: {
      labels: ['新規顧客獲得率', 'リピート率', '売上成長率', '利益率'],
      datasets: [{
        label: '2022年',
        data: [20, 30, 15, 25],
        backgroundColor: 'rgba(127, 90, 216, 0.5)',
        borderColor: 'rgba(127, 90, 216, 1)',
        borderWidth: 1
      }, {
        label: '2023年',
        data: [35, 45, 25, 35],
        backgroundColor: 'rgba(78, 49, 170, 0.5)',
        borderColor: 'rgba(78, 49, 170, 1)',
        borderWidth: 1
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
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      }
    }
  });
} 