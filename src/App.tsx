import { useState, useCallback, useEffect } from 'react';

const S = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
:root{
  --or:#FF6B35;--or2:#E8521F;--or-bg:#FFF3EE;
  --gold:#F4B400;--gold-bg:#FFFBEB;
  --green:#00C471;--green-bg:#E8FBF2;
  --red:#F04452;--red-bg:#FFF0F1;
  --blue:#3182F6;--blue-bg:#EBF3FF;
  --pur:#8B5CF6;--pur-bg:#F3EEFF;
  --bg:#F5F5F5;--white:#FFFFFF;
  --t1:#191F28;--t2:#4E5968;--t3:#8B95A1;--t4:#C5CBD2;
  --bd:#E5E8EB;--r:16px;
  --sh:0 2px 16px rgba(0,0,0,.09);
  --sh-sm:0 1px 6px rgba(0,0,0,.06);
}
html,body,#root{height:100%;background:var(--bg);font-family:'Hiragino Sans','Noto Sans JP',system-ui,sans-serif;color:var(--t1);overflow-x:hidden}
.screen{max-width:480px;margin:0 auto;min-height:100dvh;display:flex;flex-direction:column}
.top-bar{background:var(--white);padding:14px 20px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:20}
.top-title{font-size:15px;font-weight:700;color:var(--t1)}
.prog-row{display:flex;gap:3px;align-items:center}
.prog-dot{width:6px;height:6px;border-radius:50%;background:var(--bd);transition:background .2s}
.prog-dot.on{background:var(--or)}
.sp-wrap{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:48px 24px;background:var(--white);text-align:center}
.sp-animal{font-size:72px;margin-bottom:8px;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.sp-title{font-size:24px;font-weight:800;color:var(--t1);line-height:1.3;margin-bottom:8px}
.sp-title em{color:var(--or);font-style:normal}
.sp-sub{font-size:13px;color:var(--t2);line-height:1.65;margin-bottom:28px}
.sp-cards{width:100%;display:flex;flex-direction:column;gap:10px;margin-bottom:28px}
.sp-card{background:var(--bg);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;text-align:left}
.sp-card-icon{font-size:24px;flex-shrink:0}
.sp-card-text{font-size:13px;color:var(--t2);line-height:1.55}
.sp-card-text b{color:var(--t1);font-weight:600}
.btn-start{width:100%;background:var(--or);color:#fff;border:none;border-radius:14px;padding:18px;font-size:17px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.btn-start:active{background:var(--or2)}
.sp-note{font-size:12px;color:var(--t4);margin-top:12px}
.qz-body{flex:1;padding:20px 20px 32px}
.qz-prog-bar{height:4px;background:var(--bd);border-radius:99px;overflow:hidden;margin-bottom:20px}
.qz-prog-fill{height:100%;background:var(--or);border-radius:99px;transition:width .35s cubic-bezier(.4,0,.2,1)}
.dim-badge{display:inline-flex;align-items:center;gap:6px;background:var(--or-bg);border:1px solid #FFCBB0;border-radius:999px;padding:5px 12px;font-size:12px;font-weight:700;color:var(--or);margin-bottom:14px}
.q-card{background:var(--white);border-radius:var(--r);padding:22px 20px;margin-bottom:16px;box-shadow:var(--sh-sm)}
.q-idx{font-size:11px;font-weight:600;color:var(--t3);letter-spacing:.5px;margin-bottom:10px}
.q-txt{font-size:15px;font-weight:600;color:var(--t1);line-height:1.6}
.qz-opts{display:flex;flex-direction:column;gap:10px}
.opt{background:var(--white);border:2px solid var(--bd);border-radius:14px;padding:15px 18px;cursor:pointer;text-align:left;display:flex;align-items:flex-start;gap:11px;font-family:inherit;width:100%;transition:all .15s}
.opt:active{transform:scale(.98)}
.opt.on{border-color:var(--or);background:var(--or-bg)}
.opt-badge{min-width:26px;height:26px;border-radius:8px;background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--t3);flex-shrink:0;transition:all .15s}
.opt.on .opt-badge{background:var(--or);color:#fff}
.opt-txt{font-size:13px;color:var(--t2);line-height:1.55;padding-top:2px}
.opt.on .opt-txt{color:var(--t1);font-weight:500}
.qz-wrap{transition:opacity .18s,transform .18s}
.qz-wrap.out{opacity:0;transform:translateX(-14px)}
.res-hero{padding:36px 24px 28px;text-align:center;color:#fff;position:relative;overflow:hidden}
.res-hero::after{content:'';position:absolute;bottom:-40px;right:-40px;width:160px;height:160px;background:rgba(255,255,255,.07);border-radius:50%}
.res-hero::before{content:'';position:absolute;top:-30px;left:-30px;width:120px;height:120px;background:rgba(255,255,255,.05);border-radius:50%}
.res-animal-big{font-size:72px;margin-bottom:6px;position:relative;z-index:1}
.res-type{font-size:13px;font-weight:600;letter-spacing:1px;opacity:.75;margin-bottom:4px;position:relative;z-index:1}
.res-name{font-size:22px;font-weight:800;margin-bottom:6px;position:relative;z-index:1}
.res-tag{font-size:13px;opacity:.75;font-style:italic;line-height:1.5;position:relative;z-index:1}
.res-dims{display:flex;justify-content:center;gap:6px;margin-top:16px;flex-wrap:wrap;position:relative;z-index:1}
.dim-pill{background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:4px 12px;font-size:11px;font-weight:600;color:#fff}
.share-bar{background:var(--white);padding:16px 20px;border-bottom:1px solid var(--bd)}
.share-bar-title{font-size:12px;font-weight:600;color:var(--t2);margin-bottom:10px}
.share-row{display:flex;gap:8px}
.sh-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;background:var(--bg);border:none;border-radius:12px;padding:12px 8px;cursor:pointer;font-family:inherit;transition:background .15s}
.sh-btn:active{background:var(--bd)}
.sh-icon{width:38px;height:38px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-size:18px}
.sh-label{font-size:10px;font-weight:500;color:var(--t2)}
.res-secs{padding:14px 20px 40px;display:flex;flex-direction:column;gap:10px}
.sec{background:var(--white);border-radius:var(--r);overflow:hidden;box-shadow:var(--sh-sm)}
.sec-hdr{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;cursor:pointer;background:none;border:none;width:100%;font-family:inherit;text-align:left}
.sec-hdr-l{display:flex;align-items:center;gap:10px}
.sec-icon{width:34px;height:34px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:17px;flex-shrink:0}
.sec-icon.or{background:var(--or-bg)}.sec-icon.gl{background:var(--gold-bg)}
.sec-icon.gr{background:var(--green-bg)}.sec-icon.bl{background:var(--blue-bg)}
.sec-icon.pu{background:var(--pur-bg)}.sec-icon.rd{background:var(--red-bg)}
.sec-title{font-size:14px;font-weight:700;color:var(--t1)}
.chev{font-size:17px;color:var(--t4);transition:transform .2s;flex-shrink:0}
.chev.op{transform:rotate(180deg)}
.sec-body{padding:0 18px 18px;border-top:1px solid var(--bd)}
.rlist{display:flex;flex-direction:column;gap:7px;padding-top:12px}
.ri{display:block;font-size:13px;color:var(--t2);line-height:1.7;padding-left:14px;position:relative}
.ri::before{content:'▸';color:var(--or);position:absolute;left:0;top:0}
.ri b{color:var(--t1);font-weight:600}
.info-box{border-radius:12px;padding:13px 15px;margin-top:12px}
.info-box.or{background:var(--or-bg);border:1px solid #FFCBB0}
.info-box.gl{background:var(--gold-bg);border:1px solid #FDE89B}
.info-box.gr{background:var(--green-bg);border:1px solid #A3E9C7}
.info-box.rd{background:var(--red-bg);border:1px solid #F9BBBF}
.info-box.bl{background:var(--blue-bg);border:1px solid #B8D4FB}
.ib-title{font-size:11px;font-weight:700;letter-spacing:.5px;margin-bottom:6px}
.ib-title.or{color:var(--or2)}.ib-title.gl{color:#8B6914}
.ib-title.gr{color:#00824E}.ib-title.rd{color:var(--red)}.ib-title.bl{color:#1B64DA}
.ib-body{font-size:12px;line-height:1.7}
.ib-body.or{color:#CC4A18}.ib-body.gl{color:#7A5A00}
.ib-body.gr{color:#00824E}.ib-body.rd{color:#C0303C}.ib-body.bl{color:#1B64DA}
.inv-card{background:var(--bg);border-radius:12px;padding:14px 16px;margin-top:12px;display:flex;gap:14px;align-items:flex-start}
.inv-avatar{width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--or),var(--or2));display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0}
.inv-name{font-size:14px;font-weight:700;color:var(--t1);margin-bottom:2px}
.inv-title{font-size:11px;color:var(--or);font-weight:600;margin-bottom:6px}
.inv-quote{font-size:12px;color:var(--t2);line-height:1.6;font-style:italic}
.port-card{background:var(--bg);border-radius:12px;padding:16px;margin-top:12px}
.port-name{font-size:13px;font-weight:700;color:var(--t1);margin-bottom:12px}
.port-alloc{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
.alloc-row{display:flex;align-items:center;gap:8px}
.alloc-label{font-size:12px;color:var(--t2);min-width:80px}
.alloc-bar-wrap{flex:1;height:8px;background:var(--bd);border-radius:99px;overflow:hidden}
.alloc-bar{height:100%;border-radius:99px}
.alloc-pct{font-size:12px;font-weight:700;min-width:32px;text-align:right}
.port-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding-top:12px;border-top:1px solid var(--bd)}
.stat-box{text-align:center}
.stat-val{font-size:15px;font-weight:800;line-height:1.1}
.stat-lbl{font-size:10px;color:var(--t3);margin-top:2px;font-weight:500}
.etf-list{display:flex;flex-direction:column;gap:6px;margin-top:10px}
.etf-item{display:flex;justify-content:space-between;align-items:center;background:var(--bg);border-radius:10px;padding:10px 12px}
.etf-left{display:flex;flex-direction:column;gap:2px}
.etf-name{font-size:12px;font-weight:600;color:var(--t1)}
.etf-ticker{font-size:11px;color:var(--t3)}
.etf-pct{font-size:13px;font-weight:800;color:var(--or)}
.sw-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.sw-box{border-radius:12px;padding:13px 14px}
.sw-box.str{background:var(--green-bg);border:1px solid #A3E9C7}
.sw-box.wk{background:var(--red-bg);border:1px solid #F9BBBF}
.sw-title{font-size:11px;font-weight:700;margin-bottom:7px}
.sw-title.str{color:#00824E}.sw-title.wk{color:var(--red)}
.sw-item{font-size:12px;display:flex;align-items:flex-start;gap:5px;margin-bottom:5px;color:var(--t2);line-height:1.5}
.retry-btn{margin:0 20px 24px;background:var(--bg);border:2px solid var(--bd);border-radius:14px;padding:15px;font-size:14px;font-weight:700;color:var(--t2);cursor:pointer;text-align:center;font-family:inherit;width:calc(100% - 40px)}
.retry-btn:active{background:var(--bd)}
.toast{position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--t1);color:#fff;padding:10px 20px;border-radius:999px;font-size:13px;font-weight:500;opacity:0;transition:all .3s;pointer-events:none;white-space:nowrap;z-index:9999}
.toast.on{opacity:1;transform:translateX(-50%) translateY(0)}
`;

const Qs = [
  { dim: 'リスク志向', q: '株が突然30%暴落した。あなたの反応は？', a: '「バーゲンセールだ！」喜んで追加購入ボタンに手が伸びる', b: '「やっぱり売っておけばよかった...」手が震える' },
  { dim: 'リスク志向', q: '友人が「このコイン絶対10倍になる」と教えてくれた。', a: 'すぐ検索。「いくら入れようかな？」', b: '「で、根拠は何？」まず疑うところから' },
  { dim: 'リスク志向', q: '投資の目標は？', a: '5年以内に資産3倍。元本が飛んでもOK', b: '元本さえ守れれば成功。少なく稼いでも構わない' },
  { dim: 'リスク志向', q: 'レバレッジETF（2倍・3倍）についてどう思う？', a: '収益も2〜3倍だから積極的に活用する', b: '損失も2〜3倍だから絶対にやらない' },
  { dim: 'リスク志向', q: 'ポートフォリオが-25%になった。夜は眠れる？', a: 'よく眠れる。むしろ安値で買う計算をしている', b: '眠れない。明日何かしなければという気持ち' },
  { dim: 'リスク志向', q: '月の余裕資金10万円、どう運用する？', a: '全部株・ETFに投資する', b: '半分は定期預金、半分だけ投資する' },
  { dim: '投資期間', q: '投資期間についてどう考えるか？', a: '10年以上。複利の魔法を信じている', b: '1〜2年以内に成果が出ないと意味がない' },
  { dim: '投資期間', q: '今日買った株が1週間全く動かない。', a: 'そういうこともある。5年後を見ている', b: 'なぜ上がらないの？他の銘柄を探そうかな？' },
  { dim: '投資期間', q: '配当株 vs 成長株、どちら派？', a: '配当株。20年間の配当再投資が最強だ', b: '成長株。今すぐ上がるものが大事' },
  { dim: '投資期間', q: 'チャートはどのくらいの頻度で確認する？', a: '四半期に1回で十分だ', b: '1日に何度も確認してしまう' },
  { dim: '投資期間', q: '株の利益確定のタイミングは？', a: '企業の価値が変わった時、または目標価格に達した時', b: 'ある程度上がったと思ったら売りたい' },
  { dim: '投資期間', q: '「複利は8番目の不思議」という言葉について？', a: 'アインシュタインの言葉通り。時間が最強の武器', b: '良い言葉だが今すぐの利益の方が魅力的' },
  { dim: '分析スタイル', q: '銘柄を選ぶ時、どうやって決めるか？', a: 'PER・PBR・財務諸表・業界分析...丁寧に調べる', b: 'よく使う製品の会社、感覚的に良いと思う会社' },
  { dim: '分析スタイル', q: '投資情報は主にどこから得るか？', a: '企業のIR資料、証券会社のリポート、経済データ', b: 'YouTube、知人のおすすめ、SNSのトレンド' },
  { dim: '分析スタイル', q: '買いを決める基準は？', a: '自分が計算した適正株価に達した時', b: '「なんとなく今がチャンスな気がする」という感覚' },
  { dim: '分析スタイル', q: 'インデックスファンド（ETF）について？', a: '市場平均を上回るのは難しい。ETFが合理的だ', b: '自分が選んだ銘柄なら市場を上回れると思う' },
  { dim: '分析スタイル', q: '投資で失敗した後、あなたは？', a: 'どの指標を見誤ったかしっかりレビューする', b: '「運が悪かっただけ」と整理して前を向く' },
  { dim: '分析スタイル', q: '「市場に勝てない（EMH）」という理論について？', a: 'ある程度同意する。謙虚な投資が大事', b: '私は市場に勝てると思っている' },
  { dim: '投資規律', q: '投資の原則はあるか？', a: 'あるし守っている。ルールを破ると不安', b: 'なんとなくあるが状況によって柔軟に変える' },
  { dim: '投資規律', q: '毎月同じ日に同じ金額で積立投資をどう思う？', a: '最高の方法だ。感情なく機械的に', b: '良いタイミングに多めに入れたい。柔軟に' },
  { dim: '投資規律', q: 'ポートフォリオの見直し頻度は？', a: '四半期・半年に1回。定期的にリバランス', b: '気が向いた時、または大きなニュースがあった時' },
  { dim: '投資規律', q: '投資日誌をつけているか？', a: '買い・売りの理由を記録している。自分だけの投資ノート', b: 'そんなものない。記憶が記録だ' },
  { dim: '投資規律', q: '市場暴落中に現金が入ってきた！', a: 'リバランス計画に従って静かに実行する', b: '原則とか関係なく、今すぐ買わなきゃという気持ち' },
  { dim: '投資規律', q: '株価が大きく上がり含み益が膨らんだ。あなたは？', a: '目標配分比率を確認して必要ならリバランス', b: 'この辺で売りたい。欲張りは禁物だから' },
];

const PORT: Record<string, any> = {
  eagle: {
    name: '戦略的バリュー成長ポートフォリオ',
    alloc: [
      { label: '米国株', pct: 50, color: '#FF6B35' },
      { label: 'グローバル株', pct: 20, color: '#FF9A6C' },
      { label: '長期債券', pct: 20, color: '#3182F6' },
      { label: '金', pct: 10, color: '#F4B400' },
    ],
    cagr: '9.1%', mdd: '-38%', vol: '12%', sharpe: '0.64',
    comment: '株式70% + 債券・金30%。長期成長を目指しながら下落をある程度防ぐ構造。',
    etfs: [
      { name: 'eMAXIS Slim 米国株式(S&P500)', ticker: '0331418A', pct: 50 },
      { name: 'eMAXIS Slim 全世界株式', ticker: '0331120A', pct: 20 },
      { name: 'iシェアーズ 米国債20年超', ticker: '2621', pct: 20 },
      { name: 'SPDR ゴールド・シェア', ticker: '1326', pct: 10 },
    ],
    source: '1973〜2024 バックテスト参照'
  },
  turtle: {
    name: 'インデックス長期ポートフォリオ',
    alloc: [
      { label: '全世界株式', pct: 60, color: '#3182F6' },
      { label: '国内債券', pct: 30, color: '#00C471' },
      { label: '現金・短期債', pct: 10, color: '#F4B400' },
    ],
    cagr: '8.5%', mdd: '-34%', vol: '10%', sharpe: '0.68',
    comment: 'クラシック60/40。50年のバックテストで最も信頼性が実証されたポートフォリオ。',
    etfs: [
      { name: 'eMAXIS Slim 全世界株式(オール・カントリー)', ticker: '0331120A', pct: 60 },
      { name: '国内債券インデックス', ticker: '2510', pct: 30 },
      { name: '短期債券ファンド', ticker: '短期', pct: 10 },
    ],
    source: '1926〜2024 バックテスト参照'
  },
  allweather: {
    name: 'オール・ウェザー・ポートフォリオ',
    alloc: [
      { label: '株式', pct: 30, color: '#FF6B35' },
      { label: '長期債券', pct: 40, color: '#3182F6' },
      { label: '中期債券', pct: 15, color: '#60A5FA' },
      { label: '金', pct: 7.5, color: '#F4B400' },
      { label: 'コモディティ', pct: 7.5, color: '#00C471' },
    ],
    cagr: '7.4%', mdd: '-21%', vol: '7.5%', sharpe: '0.76',
    comment: 'どんな経済環境でも持ちこたえるポートフォリオ。CAGR 7.4%、最大下落-21%。',
    etfs: [
      { name: 'eMAXIS Slim 米国株式(S&P500)', ticker: '0331418A', pct: 30 },
      { name: 'iシェアーズ 米国債20年超', ticker: '2621', pct: 40 },
      { name: 'iシェアーズ 米国債7〜10年', ticker: '1482', pct: 15 },
      { name: 'SPDR ゴールド・シェア', ticker: '1326', pct: 7.5 },
      { name: 'iシェアーズ コモディティ', ticker: '1699', pct: 7.5 },
    ],
    source: 'LazyPortfolioETF 1984〜2024参照'
  },
  permanent: {
    name: 'パーマネント・ポートフォリオ',
    alloc: [
      { label: '株式', pct: 25, color: '#FF6B35' },
      { label: '債券', pct: 25, color: '#3182F6' },
      { label: '金', pct: 25, color: '#F4B400' },
      { label: '現金', pct: 25, color: '#8B95A1' },
    ],
    cagr: '6.8%', mdd: '-14%', vol: '6%', sharpe: '0.72',
    comment: '4資産を25%ずつ。最大下落-14%で最も安定した構造。守りの教科書。',
    etfs: [
      { name: 'eMAXIS Slim 米国株式(S&P500)', ticker: '0331418A', pct: 25 },
      { name: '国内債券インデックス', ticker: '2510', pct: 25 },
      { name: 'SPDR ゴールド・シェア', ticker: '1326', pct: 25 },
      { name: 'MRF（現金相当）', ticker: '現金', pct: 25 },
    ],
    source: 'PortfolioCharts.com 1972〜2024参照'
  },
  aggressive: {
    name: '攻撃型成長ポートフォリオ',
    alloc: [
      { label: '米国株', pct: 60, color: '#FF6B35' },
      { label: 'グローバル株', pct: 20, color: '#FF9A6C' },
      { label: '小型・割安株', pct: 15, color: '#E8521F' },
      { label: '金', pct: 5, color: '#F4B400' },
    ],
    cagr: '10.2%', mdd: '-52%', vol: '17%', sharpe: '0.54',
    comment: '株式95%。長期的に最も高い収益だが暴落に耐える必要あり。勇者だけのポートフォリオ。',
    etfs: [
      { name: 'eMAXIS Slim 米国株式(S&P500)', ticker: '0331418A', pct: 60 },
      { name: 'eMAXIS Slim 全世界株式', ticker: '0331120A', pct: 20 },
      { name: '米国小型バリューETF', ticker: 'VBR連携', pct: 15 },
      { name: 'SPDR ゴールド・シェア', ticker: '1326', pct: 5 },
    ],
    source: 'S&P500 1926〜2024参照'
  },
  dividend: {
    name: '配当・インカムポートフォリオ',
    alloc: [
      { label: '配当株ETF', pct: 40, color: '#00C471' },
      { label: '債券ETF', pct: 35, color: '#3182F6' },
      { label: 'REIT', pct: 20, color: '#8B5CF6' },
      { label: '現金', pct: 5, color: '#8B95A1' },
    ],
    cagr: '7.2%', mdd: '-26%', vol: '8%', sharpe: '0.65',
    comment: '安定した配当キャッシュフローが核心。配当再投資で複利効果を最大化。',
    etfs: [
      { name: 'VYM（バンガード 米国高配当株式）', ticker: 'VYM', pct: 40 },
      { name: '国内債券インデックス', ticker: '2510', pct: 35 },
      { name: 'iシェアーズ 米国リートETF', ticker: '1659', pct: 20 },
      { name: 'MRF（現金相当）', ticker: '現金', pct: 5 },
    ],
    source: 'Morningstar配当株研究 1973〜2024参照'
  },
  barbell: {
    name: 'バーベル戦略ポートフォリオ',
    alloc: [
      { label: '安全資産', pct: 80, color: '#3182F6' },
      { label: '高リスク資産', pct: 15, color: '#FF6B35' },
      { label: '金', pct: 5, color: '#F4B400' },
    ],
    cagr: '6.5%', mdd: '-8%', vol: '5%', sharpe: '0.70',
    comment: '80%超安全、20%超攻撃。ブラック・スワンにも生き残る構造。',
    etfs: [
      { name: 'MRF・短期国債', ticker: '現金', pct: 80 },
      { name: 'eMAXIS Slim 米国株式(S&P500)', ticker: '0331418A', pct: 15 },
      { name: 'SPDR ゴールド・シェア', ticker: '1326', pct: 5 },
    ],
    source: 'Nassim Taleb "Antifragile" 参照'
  },
};

const TD: Record<string, any> = {
  INTJ: { animal: 'ワシ', emoji: '🦅', name: 'ワシ型投資家', tag: '"3年後にこの銘柄がどこにいるか、もう分かっている"', color1: '#1A1A2E', color2: '#16213E', desc: 'ワシは1,000m上空からでもウサギを見つけます。INTJ投資家も同じ。他の人が短期チャートに目を奪われている時、すでに3年後の絵を描いています。', style: ['<b>長期バリュー投資</b>を好みます。企業の本質的価値の分析が基本。', '一度決めたら揺るがない強い信念。外部のノイズに無感覚。', 'ポートフォリオを頻繁に変えません。回転率が低いほど収益が高いと信じています。'], investor: { name: 'ウォーレン・バフェット', icon: '🎩', title: 'バークシャー・ハサウェイ会長', quote: '"素晴らしい企業を適正な価格で買う方が、適正な企業を素晴らしい価格で買うよりはるかに良い。"', why: 'バフェットもワシのように待ちます。INTJの分析力と忍耐力がバフェット流と完璧に一致します。' }, portfolio: PORT.eagle, strengths: ['感情に左右されない冷静な分析', '長期保有で売買コストを最小化', '他が恐怖で売る時に買う逆張り'], weaknesses: ['過信で判断を誤ることも', '損切りのタイミングが遅れる傾向', '短期イベントに無感覚すぎる'], dos: ['企業の財務諸表を自分で分析する', '5年以上保有できる銘柄だけ購入', '四半期ごとに投資テーゼを再検討'], donts: ['デイトレード・スキャルピング', 'レバレッジの無秩序な活用', '企業理解なしに他人の言葉だけを信じて購入'] },
  INFJ: { animal: 'フクロウ', emoji: '🦉', name: 'フクロウ型投資家', tag: '"お金も大切だが、どこに投資するかが自分を表す"', color1: '#2D3561', color2: '#1F2641', desc: 'フクロウは暗闇でも見えます。INFJ投資家は他の人が見えない長期トレンドと社会変化を読みます。ESG、気候変動...収益だけでなく投資が世界に与える影響まで考えます。', style: ['<b>バリュー + ESG 統合投資</b>。長期的に持続可能な企業だけを選択。', '市場のノイズに惑わされず自分の投資哲学を守ります。', '社会的価値と収益性の両方を追求します。'], investor: { name: 'レイ・ダリオ', icon: '🌊', title: 'ブリッジウォーター創業者', quote: '"私は間違える可能性があると知っているから、常にあらゆる経済環境に備えたポートフォリオを維持している。"', why: 'ダリオはINFJのように大きな絵を見て、自分だけの原則に従って静かにシステムを構築します。' }, portfolio: PORT.allweather, strengths: ['長期トレンドを読む直観力', '感情投資をしない哲学', 'ESG投資での卓越した眼力'], weaknesses: ['収益率より価値を考えすぎる', 'バリュエーションを気にしすぎる', '短期変動性に過度に不安になることも'], dos: ['オール・ウェザーポートフォリオの維持', 'ESG ETFで価値と収益を同時に追求', '長期保有 + 年1回リバランス'], donts: ['短期トレーディング', '過度な自己確信による集中投資', 'SNSによる衝動売買'] },
  ENTJ: { animal: 'ライオン', emoji: '🦁', name: 'ライオン型投資家', tag: '"市場を支配するのは臆病者ではなく勇気ある者だ"', color1: '#C62828', color2: '#B71C1C', desc: 'ライオンは群れを率います。ENTJ投資家はリスクを恐れず、むしろリスクを管理の対象として見ます。ポートフォリオのリターンで最上位を狙い、負けない戦略を設計します。', style: ['<b>攻撃的成長投資</b>。高い変動性を許容して最大の収益を追求。', 'データと分析ベースの決断。感情ではなく戦略で動く。', '大きな絵を見て大胆に投資。集中ポートフォリオを好む。'], investor: { name: 'ジョージ・ソロス', icon: '🌍', title: 'クォンタム・ファンド創業者', quote: '"世界がパターン通りに動かない時こそがむしろチャンスだ。"', why: 'ソロスは大胆で体系的な分析家。他が恐怖を感じる時に最も大きく賭ける勇気がENTJの本能と一致します。' }, portfolio: PORT.aggressive, strengths: ['危機の状況でも冷静な判断力', '大胆な賭けで大きな収益を追求', '体系的な分析とリスク管理'], weaknesses: ['過度な自信による集中投資', '損失を認めるのが遅い', 'オーバーコンフィデンスが誤判断に'], dos: ['核心10〜15銘柄に集中投資', '明確な損切り基準の設定', '年1回以上投資ロジックを再検討'], donts: ['レバレッジの過度な活用', '感情的なリベンジ売買', '市場の動きへの過敏な反応'] },
  ENFJ: { animal: 'イルカ', emoji: '🐬', name: 'イルカ型投資家', tag: '"お金も稼いで世界も良くする。両方できると信じてる！"', color1: '#00838F', color2: '#006064', desc: 'イルカは最も知能が高い動物の一つでありながら群れと共にいます。ENFJ投資家は収益と社会的価値を同時に追求します。', style: ['<b>ESG・インパクト投資</b>。環境・社会・ガバナンスが良い企業に投資。', '長期保有を好み、社会的責任を企業選択の基準に含める。', '様々な人の意見を聞いて投資決定に反映。'], investor: { name: 'デービッド・スウェンセン', icon: '🏛️', title: 'イェール大学 CIO', quote: '"長期的に持続可能な方法での投資が結局最も高い収益をもたらす。"', why: 'スウェンセンはイェール大学の基金を36年間運用して年13.7%の収益を達成。ENFJのバランス感覚と共通しています。' }, portfolio: PORT.dividend, strengths: ['ESGトレンドをいち早く読む能力', '多角的な視点から情報収集', '共感力で消費者トレンドを把握'], weaknesses: ['他人の意見に惑わされることも', '損失時の心理的ダメージが大きい', 'イメージを気にしすぎることも'], dos: ['ESG ETF + 配当株で安定したポートフォリオ', '定期積立で感情を排除', '投資コミュニティを積極活用'], donts: ['短期トレーディング', 'ESGラベルだけを見て購入', '知人のすすめだけを信じて検証なしに投資'] },
  INTP: { animal: 'タコ', emoji: '🐙', name: 'タコ型投資家', tag: '"最適な投資公式を作っている途中です。もうすぐできます。"', color1: '#4A148C', color2: '#38006B', desc: 'タコは8本の腕で同時にいくつものことをします。INTP投資家は複雑な金融モデルを愛し、すべての戦略をバックテストします。問題は分析が完璧になるまで投資を始められないこと。', style: ['<b>ファクター投資・クオンツ戦略</b>。データですべてを説明しようとする。', '複雑なポートフォリオ理論を自ら学び適用。', 'バックテストを愛するが、実際の投資は意外と遅い。'], investor: { name: 'ナシム・タレブ', icon: '🎲', title: '「ブラック・スワン」著者', quote: '"私たちが知らないことは、知っていることよりはるかに多い。謙虚さが最高の投資戦略だ。"', why: 'タレブはINTPのように複雑なシステムを分析し、ほとんどの投資家が見落とすリスクを発見します。' }, portfolio: PORT.barbell, strengths: ['複雑な金融モデルの理解能力', '感情なしにデータだけを見る冷静さ', '新しい投資戦略の素早い理解'], weaknesses: ['分析麻痺で実行できない', '過度な複雑性でシンプルな機会を逃す', '理論と実践のギャップ'], dos: ['シンプルなインデックスETFから始める', 'バックテスト結果を実行に結びつける訓練', '四半期ごとのレビュー原則を設ける'], donts: ['複雑すぎる戦略の過剰設計', '実行なしに分析だけを繰り返す', '自分のモデルが正しいという過信'] },
  INFP: { animal: 'パンダ', emoji: '🐼', name: 'パンダ型投資家', tag: '"投資も自分の価値観を守りながらやらないと。当然でしょ！"', color1: '#1B5E20', color2: '#145214', desc: 'パンダは世界で最も愛される動物ですが、実はかなり独立的で選択にうるさいです。INFP投資家は自分の価値観に合う企業にだけ投資します。', style: ['<b>価値観ベースのESG投資</b>。投資が世界に与える影響を重視。', '自分が理解して信じる企業にだけ投資。', '損失が出ても自分の原則を守る傾向が強い。'], investor: { name: 'フィリップ・フィッシャー', icon: '🌱', title: '"成長株投資の父"', quote: '"素晴らしい企業の株を永遠に保有することが最善だ。"', why: 'フィッシャーは財務データだけでなく企業文化と経営陣の倫理を重視。企業の内面を見るINFPの直観力と一致します。' }, portfolio: PORT.dividend, strengths: ['長期保有で売買コストを最小化', '自分が理解する企業だけに投資する原則', '感性的な消費トレンドの把握'], weaknesses: ['価値観のために収益機会を逃すことも', '損失時の心理的ダメージが非常に大きい', '過度な理想主義'], dos: ['ESG ETFで価値と収益を同時に追求', '10年以上の長期保有戦略', '投資日誌で感情を記録・管理'], donts: ['短期トレーディング', '自分の価値観に合わない投資を無理に試みる', '感情的な損切り・追いかけ買い'] },
  ENTP: { animal: 'キツネ', emoji: '🦊', name: 'キツネ型投資家', tag: '"みんなが買うって？じゃあ私は売る。"', color1: '#BF360C', color2: '#A31A00', desc: 'キツネは賢くてオポチュニスティックです。ENTP投資家は他が見逃す機会を発見し、逆張りを楽しみます。みんなが売る時に買い、みんなが買う時に売ります。', style: ['<b>逆張り投資</b>。市場が間違っている時を捉えることが目標。', 'コントラリアン性向。恐怖に買い、貪欲に売る。', '新しい投資機会に素早く反応する方。'], investor: { name: 'カール・アイカーン', icon: '⚡', title: 'アクティビスト投資家', quote: '"市場でチャンスを見つけるには、まず大衆が間違っていることを証明しなければならない。"', why: 'アイカーンは他が諦めた場所でチャンスを見つけ、既存の秩序に挑む方法がキツネ型と完璧に一致します。' }, portfolio: PORT.eagle, strengths: ['逆張りで割安なチャンスを捕捉', '素早い情報処理とパターン認識', '新しい投資トレンドのリード'], weaknesses: ['アイデアばかり多くて実行が不足', '頻繁すぎるポートフォリオの入れ替え', '過信による過度な集中'], dos: ['逆張り投資リストの事前準備', 'インデックスETFコア + アイデアサテライト戦略', '売買前に24時間のクールタイム'], donts: ['衝動売買', 'コア保有銘柄を頻繁に入れ替える', 'レバレッジ+逆張りを同時に活用'] },
  ENFP: { animal: 'チョウ', emoji: '🦋', name: 'チョウ型投資家', tag: '"このテーマいいな！あのテーマもいいな！全部買わなきゃ！"', color1: '#E91E63', color2: '#C2185B', desc: 'チョウは美しいです。そして一か所に長くとどまりません。ENFP投資家は新しいテーマとトレンドに胸がときめき、面白いストーリーのある銘柄が好きです。', style: ['<b>成長・テーマ投資</b>。AI、宇宙、二次電池...未来トレンドに全力投球。', 'ストーリーテリングがある企業を好む。財務諸表よりビジョンが大事。', '興味が冷めるとポートフォリオを頻繁に変える傾向。'], investor: { name: 'ピーター・リンチ', icon: '📈', title: 'マゼラン・ファンド・マネージャー', quote: '"よく知っていることに投資せよ。専門知識が株式選択の武器になる。"', why: 'リンチは日常から投資のアイデアを得ました。ENFPのように日常とトレンドからインサイトを得る方法がリンチに似ています。' }, portfolio: PORT.eagle, strengths: ['消費トレンド・新技術の早期発見', '情熱的な調査で隠れた成長株を発掘', '楽観的なマインドセット'], weaknesses: ['集中力不足でポートフォリオが散漫', 'ストーリーに惑わされて過剰なバリュエーション', '興味が薄れると損失状態で売却'], dos: ['コアインデックスETF 70% + テーマETF 30%', 'テーマETFで個別銘柄リスクを分散', '毎月ポートフォリオ確認'], donts: ['個別銘柄を20以上保有', 'ストーリーだけを信じて財務諸表を無視', '流行テーマの末期に追いかけ買い'] },
  ISTJ: { animal: 'カメ', emoji: '🐢', name: 'カメ型投資家', tag: '"遅くてもいい。最終的に私が勝つ。"', color1: '#33691E', color2: '#255212', desc: 'カメは遅いです。でもウサギに勝ちます。ISTJ投資家は毎月同じ日に同じ金額をインデックスETFに入れます。30年後に他のどんな戦略より高い確率で勝利します。', style: ['<b>パッシブインデックス投資</b>。市場平均を上回ろうとしない。市場そのものになる。', '定期積立投資。感情なし、ニュースなし、機械のように。', '不必要な売買を極度に嫌う。コスト最小化が哲学。'], investor: { name: 'ジョン・ボーグル', icon: '🏆', title: 'バンガード創設者', quote: '"シンプルに保て。市場全体を買って永遠に保有せよ。"', why: 'ボーグルの「売買コストと感情が投資家を貧しくする」という哲学がISTJの規律と一貫性と完璧に一致します。' }, portfolio: PORT.turtle, strengths: ['感情的な投資ミスを最小化', '低コストで市場平均収益を確保', 'どんな市場状況でも原則を維持'], weaknesses: ['市場暴落時に心理的不安が原則を揺らすことも', '追加収益の機会を逃すケース', '保守的すぎてポートフォリオの収益率が制限される'], dos: ['給料日に自動振込でETF定期購入を設定', 'S&P500 + 全世界株式ETF 2本でシンプル化', '年1回のリバランスをカレンダーに固定'], donts: ['個別銘柄選択の試み', '市場下落時のパニック売り', '流行商品・仕組み商品の購入'] },
  ISFJ: { animal: 'ビーバー', emoji: '🦦', name: 'ビーバー型投資家', tag: '"コツコツ積み上げていけばいつか家も建てられる"', color1: '#4E342E', color2: '#3E2723', desc: 'ビーバーは勤勉にダムを作って安全な家を建てます。ISFJ投資家は着実な積立型マインドで配当株と債券を積み上げます。', style: ['<b>配当 + 債券インカム投資</b>。安定したキャッシュフローが最優先。', '安定した配当実績を持つ企業を好む。', 'ポートフォリオの変更を嫌う。一度構成したらほぼ維持。'], investor: { name: 'ジョン・ネフ', icon: '🌿', title: 'バンガード・ウィンザーファンドマネージャー', quote: '"低PERと高配当利回りを持つ銘柄が結局市場に勝つ。"', why: 'ネフは31年間年平均13.7%の収益を達成。ビーバーのように勤勉で安定した収益を追求するISFJにぴったりの哲学です。' }, portfolio: PORT.dividend, strengths: ['安定したキャッシュフローの確保', '感情的な投資ミスが少ない', '長期保有で複利効果を最大化'], weaknesses: ['収益率が市場平均以下になることも', '過度な安全追求でインフレに弱い', '高収益の機会を逃すことへの残念感'], dos: ['配当貴族株ETFで安定したキャッシュフロー', '債券ETFで金利収益を追加', '配当金は必ず再投資する'], donts: ['短期トレーディング', '変動性の大きい成長株への過剰投資', '元本損失の恐怖から現金比率を過度に高める'] },
  ESTJ: { animal: 'サイ', emoji: '🦏', name: 'サイ型投資家', tag: '"戦略通り、システム通り。感情は投資に必要ない"', color1: '#455A64', color2: '#37474F', desc: 'サイは強くて体系的です。ESTJ投資家は徹底した投資システムを作り、それを守ります。リバランスの日付、購入基準、損切り原則...すべてがマニュアル化されています。', style: ['<b>システム + クオンツ規律投資</b>。マニュアル通りに実行する投資。', 'リバランスを定期的に、規則正しく実行。', 'ファクター投資（バリュー・モメンタム・クオリティ）に高い関心。'], investor: { name: 'ジェレミー・シーゲル', icon: '📊', title: 'ウォートンスクール教授', quote: '"長期的に株式ほど良い資産はない。規律を持って保有すればいい。"', why: 'シーゲルは200年以上の株式データを分析して株式の優位性を証明。データと規律で投資するESTJの方法と完璧に一致します。' }, portfolio: PORT.turtle, strengths: ['感情を排除した体系的な投資実行', 'リバランス規律でリスク管理', '長期成果の一貫性'], weaknesses: ['柔軟性不足で新しい機会を逃すことも', 'システムが間違っていた時の修正が遅い', '過度なルールへの執着'], dos: ['年間投資計画を立てた後、機械的に実行', 'リバランスの日程をカレンダーに固定', '投資ルールの文書化'], donts: ['ルールなしの衝動売買', '新しいホットな戦略に簡単に移行', 'システムの点検なしに数年間放置'] },
  ESFJ: { animal: 'ゾウ', emoji: '🐘', name: 'ゾウ型投資家', tag: '"サムスン、アップル、トヨタ。みんなが知る企業が一番安全！"', color1: '#1565C0', color2: '#0D47A1', desc: 'ゾウは群れの中で最も信頼される動物です。ESFJ投資家はみんなが知る大型優良株を好みます。安定性と信頼性が最優先です。', style: ['<b>ブルーチップ・大型優良株投資</b>。誰もが知る企業だけ購入。', '長く続きそうな企業、倒産しそうにない企業を好む。', '投資関連ニュースをこまめにチェックし周りと共有するのを楽しむ。'], investor: { name: 'ピーター・リンチ（安定型）', icon: '🏢', title: 'マゼラン・ファンド', quote: '"毎日使う製品を作っている会社に投資せよ。"', why: 'リンチは日常で直接経験して信頼する企業に投資。ESFJが「みんなが知る」企業を好むのと同じ文脈です。' }, portfolio: PORT.turtle, strengths: ['信頼できる優良株中心のポートフォリオ', '安定した収益で心理的な安心感', '配当収益を着実に受け取る'], weaknesses: ['大型株だけを偏愛して成長機会を逃す', '情報収集を知人・ニュースに依存', '下落時に心理的影響を受けやすい'], dos: ['日経225、S&P500 ETF中心のポートフォリオ', '配当ブルーチップ株で安定したインカムを確保', '定期分散積立で感情投資を防ぐ'], donts: ['噂・知人のすすめによるテーマ株の購入', '慣れない海外小型株', '株価下落時の衝動損切り'] },
  ISTP: { animal: 'ヒョウ', emoji: '🐆', name: 'ヒョウ型投資家', tag: '"チャートが語る。私は聴く。"', color1: '#F57F17', color2: '#E65100', desc: 'ヒョウは精密です。ISTP投資家はテクニカル分析を楽しみ、チャートでパターンを発見します。企業のストーリーより価格の動きをより信頼します。', style: ['<b>テクニカル分析 + インデックス混合投資</b>。チャートで参入タイミングを最適化。', 'セクターローテーションを把握して強いセクターETFに集中。', '過剰な分析より行動で検証する実用主義者。'], investor: { name: 'ウィリアム・オニール', icon: '📉', title: 'CANSLIMシステム開発者', quote: '"最も重要なのは大きな勝者を掴むことだ。小さな損失は素早く切り、大きな収益はゆっくり育てよ。"', why: 'オニールの素早い損切りと強い銘柄への追随という哲学がISTPの実用的で精密な行動方式と一致します。' }, portfolio: PORT.eagle, strengths: ['テクニカル分析で参入タイミングを最適化', '素早い損切りで損失を最小化', 'セクターの強さを把握する能力'], weaknesses: ['チャートに過度に依存することも', '短期シグナルの誤読で頻繁な売買', '基礎分析を疎かにする可能性'], dos: ['コアETF + テクニカル分析の並行', '明確な損切り基準を事前設定', 'セクターETFで対応して個別リスクを減らす'], donts: ['チャートだけ見て企業のファンダメンタルを無視', '頻繁すぎる売買で取引コストが増加', 'レバレッジの過度な活用'] },
  ISFP: { animal: 'シカ', emoji: '🦌', name: 'シカ型投資家', tag: '"自分のお金が減ると心臓がドキドキして...嫌だ"', color1: '#558B2F', color2: '#33691E', desc: 'シカは敏感です。ISFP投資家は株式市場の変動に非常に敏感です。損失が出ると眠れません。安定性が最優先で、元本保全が最も重要です。', style: ['<b>安全資産優先投資</b>。変動性の最小化が最優先目標。', 'パーマネント・ポートフォリオのように様々な資産に均等分散。', '元本損失が心理的に非常に辛い。リスク制限が必須。'], investor: { name: 'ハリー・ブラウン', icon: '🛡️', title: 'パーマネント・ポートフォリオ創始者', quote: '"良いポートフォリオとはよく眠れるポートフォリオだ。"', why: 'ブラウンはどんな経済環境でも元本を守るパーマネント・ポートフォリオを設計。ISFPの心の平和を最優先する投資家のための完璧な戦略です。' }, portfolio: PORT.permanent, strengths: ['パニック売りなしに安定した保有', '元本保全に最適化', '心理的平穏が長期保有につながる'], weaknesses: ['インフレ対比実質収益率が低くなることも', '良い市場での収益を多く得られない', '安全追求が過ぎて現金比率を過度に高める'], dos: ['パーマネント・ポートフォリオ25/25/25/25を維持', '年1回のリバランスで比率を復元', '緊急資金は必ず投資金と分ける'], donts: ['株式100%ポートフォリオ', 'レバレッジ・デリバティブ', '短期変動性を見て売却'] },
  ESTP: { animal: 'チーター', emoji: '🐆', name: 'チーター型投資家', tag: '"チャンスは1秒も待たない。私も1秒も待たない！"', color1: '#FF6F00', color2: '#E65100', desc: 'チーターは世界で最も速い動物です。ESTP投資家は市場で最も素早い決断を下します。モメンタムを捉え、トレンドに素早く乗ります。', style: ['<b>モメンタム・トレンドフォロー投資</b>。上がるものは上がり続ける。', '強いセクター、強い銘柄に乗る。トレンドが終わったら次へ。', '素早い判断力と実行力が強み。'], investor: { name: 'ジェシー・リバモア', icon: '🎯', title: '"ウォール街の伝説"', quote: '"市場は決して間違わない。間違うのは常に意見だけだ。"', why: 'リバモアはトレンドに従い、トレンドが崩れたらすぐにポジションを変える。ESTPの素早い判断力と完璧に一致します。' }, portfolio: PORT.aggressive, strengths: ['モメンタムの捕捉と素早い実行力', '損切りが速く損失を最小化', '強いトレンドで大きな収益が可能'], weaknesses: ['頻繁な売買で取引コスト・税負担が増加', '反転相場での大きな損失リスク', '長期複利効果を得にくい'], dos: ['モメンタムETF + 損切りルールを必ず併用', '取引回数を月最大4回に制限', '収益の一部は必ずインデックスETFに'], donts: ['長期保有銘柄にモメンタム戦略を適用', '損切りなしの追加買い', 'レバレッジ+モメンタムの同時活用'] },
  ESFP: { animal: 'クジャク', emoji: '🦚', name: 'クジャク型投資家', tag: '"昨日あのコイン100倍になったって！私だけ乗り遅れた気が..."', color1: '#6A1B9A', color2: '#4A148C', desc: 'クジャクは華やかです。ESFP投資家はSNSで話題になった銘柄、コミュニティで盛り上がったコインに熱狂します。「FOMO」が最大の敵。', style: ['<b>トレンド追随・ソーシャル投資</b>。SNS・コミュニティからアイデアを得る。', 'ストーリーがある銘柄、話題性があるテーマを好む。', '計画より即興的に投資決定する傾向。'], investor: { name: 'キャシー・ウッド', icon: '🚀', title: 'ARK Invest CEO', quote: '"イノベーションは指数関数的に価格が下がり、採用は指数関数的に増える。"', why: 'キャシー・ウッドは話題性・将来の可能性に興奮するESFPのやり方に似ていますが、高い変動性を覚悟しなければなりません。' }, portfolio: PORT.eagle, strengths: ['新技術トレンドの早期捕捉', 'コミュニティから情報を素早く収集', '楽観的なマインドで下落時も踏ん張れることも'], weaknesses: ['FOMOによる高値での追いかけ買い', '感情的な売買が多く収益確定タイミングをミス', 'コイン・テーマ株など高リスク資産への過度な偏り'], dos: ['インデックスETF 70%を必ずコアとして維持', 'テーマ・成長ETFは20%以下に制限', '購入前に24時間のクールタイム（FOMO防止）'], donts: ['SNSで流行している銘柄をすぐに購入', 'コイン・ミーム株に投資金の30%以上を配分', '収益を一度も確定せずに保有し続ける'] },
};

type Screen = 'splash' | 'quiz' | 'result';

function computeType(ans: (string|null)[]): { type: string; pcts: {dom:string;pct:number}[] } {
  const sc = [0,0,0,0];
  for (let d=0;d<4;d++) for (let i=0;i<6;i++) if (ans[d*6+i]==='A') sc[d]++;
  const SHOW_A = ['攻撃型','長期型','分析型','計画型'];
  const SHOW_B = ['防御型','短期型','直感型','柔軟型'];
  const t0 = sc[0]>=3?'E':'I';
  const t1 = sc[1]>=3?'N':'S';
  const t2 = sc[2]>=3?'T':'F';
  const t3 = sc[3]>=3?'J':'P';
  const stdType = t0+(sc[1]>=3?'N':'S')+t2+t3;
  const pcts = sc.map((s,i)=>{
    const ap = Math.round((s/6)*100);
    return { dom: ap>=50 ? SHOW_A[i] : SHOW_B[i], pct: ap>=50 ? ap : 100-ap };
  });
  return { type: stdType, pcts };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [ans, setAns] = useState<(string|null)[]>(new Array(24).fill(null));
  const [curQ, setCurQ] = useState(0);
  const [animOut, setAnimOut] = useState(false);
  const [myType, setMyType] = useState('');
  const [pcts, setPcts] = useState<{dom:string;pct:number}[]>([]);
  const [openSecs, setOpenSecs] = useState<Record<string,boolean>>({ desc: true });
  const [toast, setToast] = useState('');
  const [toastOn, setToastOn] = useState(false);

  useEffect(() => {
    const el = document.createElement('style');
    el.textContent = S;
    document.head.appendChild(el);
    return () => { document.head.removeChild(el); };
  }, []);

  const showToast = useCallback((msg: string) => {
    setToast(msg); setToastOn(true);
    setTimeout(() => setToastOn(false), 2800);
  }, []);

  const selectAns = useCallback((ch: string) => {
    if (animOut) return;
    const next = [...ans]; next[curQ] = ch; setAns(next);
    setAnimOut(true);
    setTimeout(() => {
      if (curQ < 23) { setCurQ(q => q+1); setAnimOut(false); }
      else {
        const { type, pcts: p } = computeType(next);
        setMyType(type); setPcts(p);
        setOpenSecs({ desc: true });
        setAnimOut(false);
        setScreen('result');
        window.scrollTo(0, 0);
      }
    }, 320);
  }, [ans, curQ, animOut]);

  const d = myType ? TD[myType] : null;
  const port = d?.portfolio;
  const toggle = (k: string) => setOpenSecs(s => ({...s,[k]:!s[k]}));

  const copyLink = () => {
    const url = location.href;
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => showToast('🔗 リンクをコピーしました！'));
    else { const ta = document.createElement('textarea'); ta.value = url; ta.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch(e) {} document.body.removeChild(ta); showToast('🔗 リンクをコピーしました！'); }
  };

  const shareNative = () => {
    if (!d) return;
    const text = `📊 私の投資MBTIは${d.emoji} ${d.name}！\n"${d.tag}"\n\n株式MBTIテストをやってみよう →`;
    if (navigator.share) navigator.share({ title: `株式MBTI — ${d.name}`, text, url: location.href }).catch(() => copyLink());
    else { const ta = document.createElement('textarea'); ta.value = text+'\n'+location.href; ta.style.cssText='position:fixed;opacity:0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch(e) {} document.body.removeChild(ta); showToast('📋 テキストをコピーしました！'); }
  };

  const retry = () => { setAns(new Array(24).fill(null)); setCurQ(0); setMyType(''); setScreen('splash'); window.scrollTo(0,0); };
  const DIMS = ['リスク志向','投資期間','分析スタイル','投資規律'];
  const DIMS_SUB = ['攻撃型 vs 防御型','長期型 vs 短期型','分析型 vs 直感型','計画型 vs 柔軟型'];
  const dimLabel = Math.floor(curQ/6);
  const progPct = Math.round((curQ/24)*100)+4;

  if (screen === 'splash') return (
    <div className="screen" style={{background:'var(--white)'}}>
      <div className="sp-wrap">
        <div className="sp-animal">📊</div>
        <div className="sp-title">私はどんな<br/><em>投資家</em>か？</div>
        <div className="sp-sub">株式 MBTI 性格テスト<br/>24問で16タイプの投資性格を診断します</div>
        <div className="sp-cards">
          {[{icon:'⚡',title:'24問 × 4次元診断',desc:'リスク志向・投資期間・分析スタイル・投資規律'},{icon:'🐾',title:'16の動物キャラクター',desc:'ワシ・フクロウ・ライオン・カメ・チョウ...'},{icon:'📈',title:'カスタム投資戦略',desc:'あなたのタイプに合ったポートフォリオをご提案'}].map((c,i) => (
            <div className="sp-card" key={i}><div className="sp-card-icon">{c.icon}</div><div className="sp-card-text"><b>{c.title}</b><br/>{c.desc}</div></div>
          ))}
        </div>
        <button className="btn-start" onClick={() => { setAns(new Array(24).fill(null)); setCurQ(0); setScreen('quiz'); }}>診断を始める →</button>
        <div className="sp-note">無料・ログイン不要・約3分</div>
      </div>
      <div className={`toast${toastOn?' on':''}`}>{toast}</div>
    </div>
  );

  if (screen === 'quiz') {
    const q = Qs[curQ];
    return (
      <div className="screen">
        <div className="top-bar"><span className="top-title">株式 MBTI</span><div className="prog-row">{[0,1,2,3].map(i => <div key={i} className={`prog-dot${i<=dimLabel?' on':''}`}/>)}</div></div>
        <div className="qz-body">
          <div className="qz-prog-bar"><div className="qz-prog-fill" style={{width:`${progPct}%`}}/></div>
          <div className="dim-badge">📌 {DIMS[dimLabel]} — {DIMS_SUB[dimLabel]}</div>
          <div className={`qz-wrap${animOut?' out':''}`}>
            <div className="q-card"><div className="q-idx">Q{curQ+1} / 24</div><div className="q-txt">{q.q}</div></div>
            <div className="qz-opts">
              {(['A','B'] as const).map((ch,i) => (
                <button key={ch} className={`opt${ans[curQ]===ch?' on':''}`} onClick={() => selectAns(ch)}>
                  <div className="opt-badge">{ch}</div><div className="opt-txt">{i===0?q.a:q.b}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={`toast${toastOn?' on':''}`}>{toast}</div>
      </div>
    );
  }

  if (screen === 'result' && d) {
    const Sec = ({k, icon, color, title, children}: any) => (
      <div className="sec">
        <button className="sec-hdr" onClick={() => toggle(k)}>
          <div className="sec-hdr-l"><div className={`sec-icon ${color}`}>{icon}</div><div className="sec-title">{title}</div></div>
          <span className={`chev${openSecs[k]?' op':''}`}>⌄</span>
        </button>
        {openSecs[k] && <div className="sec-body">{children}</div>}
      </div>
    );
    return (
      <div className="screen">
        <div className="share-bar" style={{position:'sticky',top:0,zIndex:20}}>
          <div className="share-bar-title">結果をシェアする</div>
          <div className="share-row">
            <button className="sh-btn" onClick={shareNative}><div className="sh-icon" style={{background:'#E8FBF2'}}>📤</div><span className="sh-label">シェア</span></button>
            <button className="sh-btn" onClick={copyLink}><div className="sh-icon" style={{background:'#EBF3FF'}}>🔗</div><span className="sh-label">リンクコピー</span></button>
          </div>
        </div>
        <div className="res-hero" style={{background:`linear-gradient(145deg, ${d.color1}, ${d.color2})`}}>
          <div className="res-animal-big">{d.emoji}</div>
          <div className="res-type">私の投資 MBTI</div>
          <div className="res-name">{d.name}</div>
          <div className="res-tag">{d.tag}</div>
          <div className="res-dims">{pcts.map((p,i) => <div key={i} className="dim-pill">{p.dom} {p.pct}%</div>)}</div>
        </div>
        <div className="res-secs">
          <Sec k="desc" icon="🐾" color="or" title="投資家キャラクター">
            <p style={{fontSize:'13px',color:'var(--t2)',lineHeight:1.7,paddingTop:'12px'}}>{d.desc}</p>
            <div className="rlist" style={{marginTop:'12px'}}>{d.style.map((s:string,i:number) => <div key={i} className="ri" dangerouslySetInnerHTML={{__html:s}}/>)}</div>
          </Sec>
          <Sec k="investor" icon="👤" color="gl" title="あなたに似た伝説の投資家">
            <div className="inv-card">
              <div className="inv-avatar">{d.investor.icon}</div>
              <div><div className="inv-name">{d.investor.name}</div><div className="inv-title">{d.investor.title}</div><div className="inv-quote">{d.investor.quote}</div></div>
            </div>
            <div className="info-box bl" style={{marginTop:'12px'}}><div className="ib-title bl">なぜ似ているか？</div><div className="ib-body bl">{d.investor.why}</div></div>
          </Sec>
          <Sec k="port" icon="📊" color="gr" title="推奨ポートフォリオ">
            {port && <>
              <div className="port-card">
                <div className="port-name">{port.name}</div>
                <div className="port-alloc">{port.alloc.map((a:any,i:number) => (
                  <div key={i} className="alloc-row">
                    <span className="alloc-label">{a.label}</span>
                    <div className="alloc-bar-wrap"><div className="alloc-bar" style={{width:`${a.pct}%`,background:a.color}}/></div>
                    <span className="alloc-pct" style={{color:a.color}}>{a.pct}%</span>
                  </div>
                ))}</div>
                <div className="port-stats">{[['CAGR',port.cagr],['最大下落',port.mdd],['年率変動',port.vol],['シャープ',port.sharpe]].map(([l,v]:any,i:number)=>(
                  <div key={i} className="stat-box"><div className="stat-val" style={{color:i===1?'var(--red)':'var(--or)'}}>{v}</div><div className="stat-lbl">{l}</div></div>
                ))}</div>
              </div>
              <div className="info-box or" style={{marginTop:'10px'}}><div className="ib-title or">📌 ポートフォリオの特徴</div><div className="ib-body or">{port.comment}</div></div>
              <div style={{fontSize:'12px',fontWeight:600,color:'var(--t2)',margin:'14px 0 8px'}}>🇯🇵 日本対応 ETF（参考）</div>
              <div className="etf-list">{port.etfs.map((e:any,i:number)=>(
                <div key={i} className="etf-item"><div className="etf-left"><span className="etf-name">{e.name}</span><span className="etf-ticker">{e.ticker}</span></div><span className="etf-pct">{e.pct}%</span></div>
              ))}</div>
              <div style={{fontSize:'10px',color:'var(--t4)',marginTop:'10px',lineHeight:1.5}}>{port.source}</div>
            </>}
          </Sec>
          <Sec k="sw" icon="⚖️" color="bl" title="強みと弱み">
            <div className="sw-row">
              <div className="sw-box str"><div className="sw-title str">💪 強み</div>{d.strengths.map((s:string,i:number) => <div key={i} className="sw-item">{s}</div>)}</div>
              <div className="sw-box wk"><div className="sw-title wk">⚠️ 弱み</div>{d.weaknesses.map((w:string,i:number) => <div key={i} className="sw-item">{w}</div>)}</div>
            </div>
          </Sec>
          <Sec k="advice" icon="💡" color="pu" title="投資アドバイス">
            <div style={{paddingTop:'12px'}}>
              <div className="info-box gr"><div className="ib-title gr">✅ やるべきこと</div><div className="rlist" style={{marginTop:'6px'}}>{d.dos.map((s:string,i:number) => <div key={i} className="ri">{s}</div>)}</div></div>
              <div className="info-box rd" style={{marginTop:'10px'}}><div className="ib-title rd">🚫 やってはいけないこと</div><div className="rlist" style={{marginTop:'6px'}}>{d.donts.map((s:string,i:number) => <div key={i} className="ri">{s}</div>)}</div></div>
            </div>
          </Sec>
        </div>
        <div style={{margin:'0 20px 8px',padding:'12px 14px',background:'var(--bg)',borderRadius:'10px',fontSize:'10px',color:'var(--t3)',lineHeight:1.6,textAlign:'center'}}>
          ⚠️ 本コンテンツは教育・エンターテインメント目的です。投資の最終決定はご自身の判断と責任で行ってください。
        </div>
        <div style={{margin:'0 20px 16px',background:'var(--white)',borderRadius:'var(--r)',padding:'18px',boxShadow:'var(--sh-sm)'}}>
          <div style={{fontSize:'12px',fontWeight:700,color:'var(--t3)',letterSpacing:'.5px',marginBottom:'12px'}}>🛒 あなたのタイプにおすすめ</div>
          <a href="https://amzn.to/4bpYfqZ" target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:'14px',padding:'14px',background:'var(--bg)',borderRadius:'12px',textDecoration:'none',marginBottom:'10px'}}>
            <div style={{fontSize:'32px',flexShrink:0}}>📚</div>
            <div>
              <div style={{fontSize:'13px',fontWeight:700,color:'var(--t1)',marginBottom:'3px'}}>投資の名著・おすすめ本</div>
              <div style={{fontSize:'12px',color:'var(--t3)',marginBottom:'6px'}}>あなたの投資タイプに合った一冊</div>
              <div style={{display:'inline-block',background:'#FF9900',color:'#fff',fontSize:'11px',fontWeight:700,padding:'4px 10px',borderRadius:'6px'}}>Amazonで見る →</div>
            </div>
          </a>
          <div style={{fontSize:'10px',color:'var(--t4)',textAlign:'center'}}>※ Amazonアソシエイトリンクを含みます</div>
        </div>
        <button className="retry-btn" onClick={retry}>↺ もう一度テストする</button>
        <div className={`toast${toastOn?' on':''}`}>{toast}</div>
      </div>
    );
  }
  return null;
}
