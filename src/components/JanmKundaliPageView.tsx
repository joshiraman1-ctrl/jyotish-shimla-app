import React from 'react';

const htmlContent = `<!DOCTYPE html>
<html lang="hi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ज्योतिषशिमला - जन्म कुण्डली एवं दशा</title>

<style>
/* Anti-Theft: Selection & User Drag Disabled */
*{
  box-sizing:border-box;
  margin:0;
  padding:0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

input, textarea {
  -webkit-user-select: text !important;
  -moz-user-select: text !important;
  -ms-user-select: text !important;
  user-select: text !important;
}

html,body{
  width:100%;
  max-width:100%;
  overflow-x:hidden;
}

body{
  font-family:"Segoe UI",Arial,sans-serif;
  background:linear-gradient(135deg,#fcf8f2,#f4ece1);
  padding:8px 4px;
  color:#2b221b;
  font-size:15px;
}

.app-container{
  width:100%;
  max-width:920px;
  margin:auto;
  background:#fff;
  border:1px solid #d4c3ab;
  border-radius:14px;
  overflow:hidden;
  box-shadow:0 10px 30px rgba(80,30,20,.10);
  position: relative;
}

/* Dynamic Anti-Theft Watermark Overlay */
.app-container::before {
  content: "JYOTISH SHIMLA • PROTECTED CONTENT";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg);
  font-size: 32px;
  font-weight: 900;
  color: rgba(122, 28, 28, 0.04);
  white-space: nowrap;
  pointer-events: none;
  z-index: 9999;
}

.app-header{
  background:linear-gradient(135deg,#7a1c1c,#a83232,#8b2323);
  color:#fff;
  padding:15px 12px;
  text-align:center;
  border-bottom:3px solid #d4af37;
}

.brand-name{
  font-size:26px;
  font-weight:900;
  color:#fffdfa;
  letter-spacing:1px;
}

.brand-tagline{
  font-size:13px;
  font-weight:700;
  color:#fbe8c5;
  margin-top:4px;
}

.astro-quote-box{
  background:#fdf6e7;
  color:#5c1d1d;
  padding:10px 14px;
  text-align:center;
  font-size:14px;
  font-weight:800;
  border-bottom:1px solid #ebd9b8;
  line-height:1.5;
}

.controls-section{
  background:#fffdfa;
  padding:12px;
  border-bottom:1px solid #e8dbca;
}

.controls-grid{
  display:flex;
  flex-direction:column;
  gap:10px;
}

.form-card{
  background:#faf4eb;
  border:1px solid #e2d3be;
  border-radius:9px;
  padding:10px;
}

.form-card label{
  display:block;
  font-size:13.5px;
  font-weight:900;
  color:#611818;
  margin-bottom:5px;
}

.input-group input{
  width:100%;
  min-height:38px;
  padding:6px 10px;
  border:1px solid #c9b499;
  border-radius:6px;
  font-size:13.5px;
  font-weight:700;
  color:#2b221b;
  outline:none;
  background:#fff;
  font-family:inherit;
}

.input-group input:focus{
  border-color:#7a1c1c;
  box-shadow:0 0 0 2px rgba(122,28,28,.12);
}

.birth-place-search{
  display:flex;
  gap:6px;
  align-items:stretch;
}

.birth-place-search input{
  flex:1;
  min-width:0;
  min-height:38px;
  padding:6px 10px;
  border:1px solid #c9b499;
  border-radius:6px;
  font-size:13.5px;
  font-weight:700;
  color:#2b221b;
  outline:none;
  background:#fff;
  font-family:inherit;
}

.birth-place-search button{
  min-width:80px;
  border:1px solid #d4af37;
  border-radius:6px;
  background:linear-gradient(135deg,#8c2323,#691717);
  color:#fff;
  font-size:13px;
  font-weight:900;
  cursor:pointer;
  padding:4px 10px;
}

.place-results{
  display:none;
  margin-top:6px;
  border:1px solid #e2d3be;
  border-radius:7px;
  background:#fff;
  overflow:hidden;
  max-height:180px;
  overflow-y:auto;
  position:relative;
  z-index:20;
}

.place-result{
  padding:8px;
  border-bottom:1px solid #f2e6d5;
  cursor:pointer;
  font-size:12.5px;
  line-height:1.3;
  color:#3a2e26;
  font-weight:700;
}

.selected-place-box{
  margin-top:6px;
  padding:6px 10px;
  background:#fdf8ef;
  border:1px solid #e5d7c3;
  border-radius:6px;
  font-size:12.5px;
  color:#5c1d1d;
  line-height:1.4;
}

.location-action-row{
  display:flex;
  gap:6px;
  margin-top:6px;
}

.location-action-row button{
  flex:1;
  min-height:34px;
  border:1px solid #d4c3ab;
  border-radius:6px;
  background:#fff;
  color:#7a1c1c;
  font-size:12px;
  font-weight:900;
  cursor:pointer;
}

.coordinates-box{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:6px;
  margin-top:6px;
}

.coordinates-box input{
  width:100%;
  min-height:32px;
  padding:4px 6px;
  border:1px solid #d8c8b4;
  border-radius:5px;
  font-size:12px;
  font-weight:700;
  color:#3a2e26;
  background:#fff;
  text-align:center;
  outline:none;
}

.btn-container{
  display:flex;
  justify-content:center;
  gap:10px;
  margin-top:10px;
}

.btn-container button{
  background:linear-gradient(135deg,#8c2323,#691717);
  color:#fff;
  border:1px solid #d4af37;
  padding:9px 20px;
  border-radius:7px;
  font-weight:900;
  font-size:14.5px;
  cursor:pointer;
  min-height:42px;
  box-shadow:0 4px 10px rgba(100,20,20,.15);
}

.btn-container button.btn-live{
  background:linear-gradient(135deg,#9e3800,#6b2600);
}

.time-section{
  background:#fdf7ed;
  padding:10px;
  text-align:center;
  color:#4a1818;
  font-size:14px;
  font-weight:800;
  border-bottom:1px solid #e8dac8;
  line-height:1.5;
}

.location-badge{
  font-size:13px;
  color:#5e5248;
  display:block;
  margin-top:2px;
}

.live-dot{
  height:9px;
  width:9px;
  background:#2e7d32;
  border-radius:50%;
  display:inline-block;
  margin-right:6px;
  box-shadow:0 0 6px #2e7d32;
}

.swisseph-status{
  font-size:12px;
  font-weight:800;
  color:#611818;
  text-align:center;
  margin-top:4px;
}

.charts-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
  padding:10px;
  background:#fffdfa;
  border-bottom:1px solid #e8dbca;
}

.chart-panel{
  min-width:0;
  background:#fff;
  border:1px solid #e2d3be;
  border-radius:10px;
  overflow:hidden;
}

.chart-panel-title{
  text-align:center;
  padding:8px 6px;
  background:linear-gradient(135deg,#fbf0de,#f5e3c7);
  color:#7a1c1c;
  font-weight:900;
  font-size:14.5px;
  border-bottom:1px solid #e2d3be;
}

.chart-box{
  background:#fffdfa;
  display:flex;
  justify-content:center;
  align-items:center;
  padding:6px;
}

.chart-box svg{
  width:100%;
  max-width:430px;
  height:auto;
  display:block;
}

.sign-number{
  font-size:11px;
  font-weight:900;
  fill:#5c1d1d;
}

.p-main{
  font-size:10.5px;
  font-weight:900;
  fill:#2b221b;
}

.p-special{
  fill:#b82614!important;
  font-weight:900!important;
}

.footnote{
  background:#fcf5ea;
  color:#5c4c3e;
  font-size:13px;
  font-weight:800;
  padding:8px;
  text-align:center;
  border-bottom:1px solid #e8dbca;
}

.table-wrapper{
  padding:8px;
  background:#fff;
}

.data-table{
  width:100%;
  border-collapse:separate;
  border-spacing:0;
  font-size:15px;
  table-layout:fixed;
  border:1px solid #e2d3be;
  border-radius:9px;
  overflow:hidden;
}

.data-table th{
  background:linear-gradient(135deg,#7a1c1c,#9e2a2a);
  color:#fffdfa;
  font-weight:900;
  font-size:14px;
  padding:9px 4px;
  text-align:center;
  border-bottom:2px solid #d4af37;
}

.data-table td{
  padding:8px 4px;
  border-bottom:1px solid #f2e7d8;
  font-weight:800;
  text-align:center;
  line-height:1.4;
  color:#2b221b;
  word-break:break-word;
}

.special-planet{
  font-weight:900!important;
}

.retro-combust-bg{
  background:#fdf2e9!important;
}

.planet-surya td{background:#fff9ed}
.planet-chandra td{background:#f0f8ff}
.planet-mangal td{background:#fdf0ed}
.planet-budha td{background:#f1f9f1}
.planet-guru td{background:#fdfbe8}
.planet-shukra td{background:#fcf0f5}
.planet-shani td{background:#f2f5f8}
.planet-rahu td{background:#f6f1fb}
.planet-ketu td{background:#f4f5f5}
.planet-lagna td{background:#fdf4e7}

.dasha-container,
.kundli-summary{
  background:linear-gradient(135deg,#fffdfa,#fdf8ef);
  margin:10px;
  padding:12px;
  border:1px solid #e2d3be;
  border-radius:11px;
}

.dasha-title,
.summary-title{
  color:#7a1c1c;
  font-size:18.5px;
  font-weight:900;
  text-align:center;
  margin-bottom:10px;
  border-bottom:2px solid #d4af37;
  padding-bottom:6px;
}

.live-dasha-box{
  background:#fdf2df;
  border:1px solid #ebd2a4;
  border-radius:8px;
  padding:10px;
  margin-bottom:12px;
  text-align:center;
  font-size:14.5px;
  font-weight:800;
  color:#611818;
}

.live-dasha-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:6px;
}

.live-dasha-item{
  background:#fff;
  border:1px solid #e8dac8;
  border-radius:7px;
  padding:6px 4px;
  color:#3a2e26;
  font-size:13px;
}

.live-dasha-item strong{
  color:#8c2323;
  font-size:14.5px;
  display:block;
  margin-top:2px;
}

.dasha-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 6px;
}

.dasha-header-row .section-sub-title {
  margin: 0;
}

.dasha-toggle-btn {
  background: #fdf2df;
  border: 1px solid #d4af37;
  color: #7a1c1c;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dasha-toggle-btn:hover {
  background: #7a1c1c;
  color: #fff;
}

.section-sub-title{
  font-size:15px;
  font-weight:900;
  color:#7a1c1c;
  text-align:left;
  border-left:4px solid #d4af37;
  padding-left:8px;
}

.dasha-table{
  width:100%;
  border-collapse:collapse;
  font-size:14.5px;
  margin-bottom:12px;
  background:#fff;
  border:1px solid #e2d3be;
  border-radius:7px;
  overflow:hidden;
}

.dasha-table.show-only-active tbody tr:not(.dasha-row-active) {
  display: none;
}

.dasha-table th{
  background:linear-gradient(135deg,#7a1c1c,#9e2a2a);
  color:#fffdfa;
  font-size:13.5px;
  font-weight:900;
  padding:8px 4px;
}

.dasha-table td{
  padding:7px 4px;
  text-align:center;
  border-bottom:1px solid #f2e7d8;
  font-weight:800;
  line-height:1.4;
  color:#2b221b;
}

.dasha-row-active{
  background:#fdf0d5!important;
  color:#691717!important;
  font-weight:900!important;
}

.summary-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:7px;
}

.summary-card{
  background:#fff;
  border:1px solid #e2d3be;
  border-radius:8px;
  padding:8px 5px;
  text-align:center;
  min-height:60px;
}

.summary-card .label{
  display:block;
  font-size:12.5px;
  color:#5c4c3e;
  font-weight:800;
  margin-bottom:3px;
}

.summary-card .value{
  display:block;
  font-size:14.5px;
  color:#7a1c1c;
  font-weight:900;
}

.summary-card.good .value{
  color:#1b5e20;
}

.summary-card.warn .value{
  color:#b71c1c;
}

.summary-gemstone{
  grid-column:1 / -1;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  flex-wrap:wrap;
  background:#fdf7ea;
  border:1px solid #e5d5b7;
  border-radius:8px;
  padding:10px;
  font-size:14px;
  color:#4a3b30;
  margin-top:8px;
}

.summary-gemstone .summary-gem-label{
  font-weight:900;
  color:#611818;
}

.summary-gemstone strong{
  font-size:16px;
  color:#8c2323;
}

.recommend-box{
  margin-top:10px;
  background:#fdf8ef;
  border:1px solid #e5d7c3;
  border-radius:10px;
  padding:10px;
}

.recommend-title{
  color:#7a1c1c;
  font-size:17px;
  font-weight:900;
  text-align:center;
  margin-bottom:8px;
  padding-bottom:5px;
  border-bottom:2px solid #d4af37;
}

.recommend-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:7px;
}

.recommend-item{
  background:#fff;
  border:1px solid #e8dac8;
  border-radius:7px;
  padding:8px;
  font-size:14px;
  line-height:1.5;
  color:#3a2e26;
}

.recommend-item strong{
  color:#7a1c1c;
}

.dasha-analysis{
  margin-top:12px;
  background:#fafcfb;
  border:1px solid #d8e5e1;
  border-radius:10px;
  padding:11px;
}

.analysis-title{
  color:#7a1c1c;
  font-size:17.5px;
  font-weight:900;
  text-align:center;
  margin-bottom:8px;
  padding-bottom:5px;
  border-bottom:2px solid #d4af37;
}

.analysis-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:7px;
}

.analysis-item{
  background:#fff;
  border:1px solid #e1e8e6;
  border-radius:7px;
  padding:9px;
  font-size:14.5px;
  line-height:1.55;
  color:#2b3a3b;
}

.analysis-item strong{
  color:#7a1c1c;
}

.analysis-full{
  grid-column:1/-1;
  background:#fffdf7;
  border:1px solid #ebdcb8;
}

.analysis-disclaimer{
  margin-top:8px;
  padding:8px;
  background:#f4f7f6;
  border-radius:6px;
  color:#556363;
  font-size:12.5px;
  line-height:1.5;
  text-align:center;
}

.ai-chat-box {
  margin-top: 14px;
  background: #fff;
  border: 1px solid #d4af37;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 4px 15px rgba(122,28,28,.08);
}

.ai-chat-title {
  color: #7a1c1c;
  font-size: 18px;
  font-weight: 900;
  text-align: center;
  margin-bottom: 9px;
  padding-bottom: 6px;
  border-bottom: 2px solid #d4af37;
}

.ai-chat-messages {
  max-height: 250px;
  overflow-y: auto;
  border: 1px solid #e5d7c3;
  background: #fdfaf5;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 14px;
}

.ai-msg {
  margin-bottom: 8px;
  line-height: 1.5;
}

.ai-msg.user {
  text-align: right;
  color: #691717;
  font-weight: 700;
}

.ai-msg.bot {
  text-align: left;
  color: #2b221b;
  font-weight: 600;
  background: #fff;
  padding: 8px 11px;
  border-radius: 8px;
  border: 1px solid #e2d3be;
  display: inline-block;
  max-width: 92%;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  white-space: pre-wrap;
}

.ai-input-row {
  display: flex;
  gap: 8px;
}

.ai-input-row input {
  flex: 1;
  min-height: 38px;
  padding: 6px 10px;
  border: 1px solid #c9b499;
  border-radius: 7px;
  font-size: 13.5px;
  outline: none;
  font-family: inherit;
}

.ai-input-row button {
  min-width: 85px;
  background: linear-gradient(135deg,#8c2323,#691717);
  color: #fff;
  border: 1px solid #d4af37;
  border-radius: 7px;
  font-weight: 900;
  cursor: pointer;
  font-size: 13.5px;
}

.final-astro-disclaimer{
  background:#fdf5e8;
  border:1px solid #e5d3b3;
  border-radius:9px;
  padding:10px;
  margin:12px 10px 8px;
  text-align:center;
  font-size:13px;
  line-height:1.6;
  color:#5c3e1d;
  font-weight:700;
}

.brand-footer{
  background:linear-gradient(135deg,#fbf2e3,#f5e6ce);
  border-top:1px solid #e2d3be;
  padding:12px;
  text-align:center;
  color:#5c1d1d;
  font-size:14px;
  font-weight:800;
}

.brand-footer span{
  color:#b8860b;
  margin:0 5px;
}

.whatsapp-box{
  margin:10px;
  padding:11px;
  background:#f0f8f2;
  border:1px solid #b8e0c0;
  border-radius:10px;
  text-align:center;
}

.whatsapp-title{
  color:#1b5e20;
  font-size:17px;
  font-weight:900;
  margin-bottom:4px;
}

.whatsapp-info{
  color:#3a4e3e;
  font-size:13.5px;
  line-height:1.45;
  margin-bottom:9px;
  font-weight:600;
}

.share-buttons{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;
}

.whatsapp-button,.jpeg-button{
  width:100%;
  border:1px solid #d4af37;
  color:#fff;
  padding:11px 14px;
  border-radius:8px;
  font-size:14.5px;
  font-weight:900;
  cursor:pointer;
  box-shadow:0 3px 10px rgba(100,20,20,.15);
}

.whatsapp-button{background:linear-gradient(135deg,#2e7d32,#1b5e20);}
.jpeg-button{background:linear-gradient(135deg,#8c2323,#691717);}

@media(max-width:700px){
  body{padding:4px 2px;font-size:15px;}
  .app-container{border-radius:10px;}
  .brand-name{font-size:22px;}
  .summary-grid{grid-template-columns:1fr 1fr;}
  .live-dasha-grid{grid-template-columns:1fr 1fr;}
  .charts-grid{grid-template-columns:1fr;}
}

@media(max-width:430px){
  .summary-card .label{font-size:11.5px;}
  .summary-card .value{font-size:13.5px;}
  .analysis-grid,.recommend-grid{grid-template-columns:1fr;}
  .share-buttons{grid-template-columns:1fr;}
}
</style>

<script type="module">
  import SwissEph from 'https://cdn.jsdelivr.net/npm/swisseph-wasm@0.1.0/src/swisseph.js';
  window.SwissEph = SwissEph;
  
  if (typeof SwissEph === 'function') {
    SwissEph().then((swe) => {
      window.sweInstance = swe;
      window.swissEphLoaded = true;
      if(window.triggerKundliUpdate){ window.triggerKundliUpdate(); }
    }).catch(err => {
      window.swissEphLoaded = false;
      if(window.triggerKundliUpdate){ window.triggerKundliUpdate(); }
    });
  }
</script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
</head>
<body>

<div class="app-container">
  <div class="app-header">
    <div class="brand-name">✨ ज्योतिषशिमला ✨</div>
    <div class="brand-tagline">लाइव गोचर, जन्म कुण्डली एवं विस्तृत 4-स्तरीय दशा</div>
  </div>

  <div class="astro-quote-box" id="daily-mantra">
    मंत्र लोड हो रहा है...
  </div>

  <div class="controls-section">
    <div class="controls-grid">
      <div class="form-card">
        <label>📅 जन्म तिथि एवं समय (IST)</label>
        <div class="input-group" style="display:flex; gap:8px;">
          <div style="flex:1;">
            <label for="custom-date" style="font-size:12px; color:#7a1c1c; margin-bottom:2px; display:block;">दिनांक (Date)</label>
            <input type="date" id="custom-date" style="width:100%;">
          </div>
          <div style="flex:1;">
            <label for="custom-time" style="font-size:12px; color:#7a1c1c; margin-bottom:2px; display:block;">समय (Time)</label>
            <input type="time" id="custom-time" step="1" style="width:100%;">
          </div>
        </div>
      </div>

      <div class="form-card">
        <label for="birth-place">📍 जन्म स्थान व चयनित स्थान</label>
        <div class="birth-place-search">
          <input type="text" id="birth-place" placeholder="जन्म स्थान लिखें..." autocomplete="off" value="Shimla">
          <button type="button" id="btn-find-place">📍 खोजें</button>
        </div>

        <div id="place-results" class="place-results"></div>

        <div class="selected-place-box" id="selected-place-box">
          <strong>📍 चयनित स्थान:</strong> <span id="selected-place-name">शिमला, Himachal Pradesh, India</span><br>
          <small id="selected-place-coordinates">31.104800° N, 77.173400° E</small>
        </div>

        <div class="location-action-row">
          <button type="button" id="btn-current-location">📡 मेरी वर्तमान लोकेशन</button>
          <button type="button" id="btn-default-shimla">🏔️ शिमला</button>
        </div>

        <div class="coordinates-box">
          <input type="number" id="custom-lat" value="31.104800" step="0.000001" placeholder="अक्षांश">
          <input type="number" id="custom-lon" value="77.173400" step="0.000001" placeholder="देशांतर">
        </div>
      </div>
    </div>

    <div class="btn-container">
      <button id="btn-set-date">🔮 कुण्डली देखें</button>
      <button id="btn-reset-live" class="btn-live">🪐 लाइव गोचर</button>
    </div>
  </div>

  <div class="time-section">
    <div>
      <span class="live-dot" id="live-indicator"></span>
      <span id="live-clock">समय लोड हो रहा है...</span>
    </div>
    <div class="swisseph-status" id="swisseph-status">गणना इंजन प्रारंभ हो रहा है...</div>
    <span class="location-badge" id="location-display">स्थान: शिमला</span>
  </div>

  <div class="charts-grid">
    <div class="chart-panel">
      <div class="chart-panel-title">🔮 जन्म कुण्डली (D-1)</div>
      <div class="chart-box">
        <svg viewBox="90 80 320 335" xmlns="http://www.w3.org/2000/svg" id="kundli-svg">
          <defs>
            <linearGradient id="chartBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#7a1c1c"/>
              <stop offset="50%" stop-color="#d4af37"/>
              <stop offset="100%" stop-color="#7a1c1c"/>
            </linearGradient>
          </defs>
          <rect x="100" y="100" width="300" height="300" fill="#fffdfa" stroke="url(#chartBorder)" stroke-width="2.5"/>
          <line x1="100" y1="100" x2="400" y2="400" stroke="url(#chartBorder)" stroke-width="1.5"/>
          <line x1="400" y1="100" x2="100" y2="400" stroke="url(#chartBorder)" stroke-width="1.5"/>
          <polygon points="250,100 400,250 250,400 100,250" fill="none" stroke="url(#chartBorder)" stroke-width="1.5"/>
          <g id="svg-signs"></g><g id="svg-planets"></g>
        </svg>
      </div>
    </div>

    <div class="chart-panel">
      <div class="chart-panel-title">✨ नवांश कुण्डली (D-9)</div>
      <div class="chart-box">
        <svg viewBox="90 80 320 335" xmlns="http://www.w3.org/2000/svg" id="navamsa-svg">
          <defs>
            <linearGradient id="navChartBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#7a1c1c"/>
              <stop offset="50%" stop-color="#d4af37"/>
              <stop offset="100%" stop-color="#7a1c1c"/>
            </linearGradient>
          </defs>
          <rect x="100" y="100" width="300" height="300" fill="#fffdfa" stroke="url(#navChartBorder)" stroke-width="2.5"/>
          <line x1="100" y1="100" x2="400" y2="400" stroke="url(#navChartBorder)" stroke-width="1.5"/>
          <line x1="400" y1="100" x2="100" y2="400" stroke="url(#navChartBorder)" stroke-width="1.5"/>
          <polygon points="250,100 400,250 250,400 100,250" fill="none" stroke="url(#navChartBorder)" stroke-width="1.5"/>
          <g id="nav-signs"></g><g id="nav-planets"></g>
        </svg>
      </div>
    </div>
  </div>

  <div class="footnote">
    * वक्री (Retrograde) &nbsp; • &nbsp; (अ) अस्त (Combust)
  </div>

  <div class="table-wrapper">
    <table class="data-table">
      <thead>
        <tr>
          <th style="width:24%">ग्रह</th>
          <th style="width:20%">राशि</th>
          <th style="width:22%">अंश</th>
          <th style="width:34%">नक्षत्र</th>
        </tr>
      </thead>
      <tbody id="planetary-table-body"></tbody>
    </table>
  </div>

  <div class="dasha-container">
    <div class="dasha-title">🔮 विंशोत्तरी दशा श्रृंखला (4-स्तरीय)</div>

    <div class="live-dasha-box">
      <div class="live-dasha-grid">
        <div class="live-dasha-item">महादशा: <strong id="live-md">--</strong></div>
        <div class="live-dasha-item">अंतर्दशा: <strong id="live-ad">--</strong></div>
        <div class="live-dasha-item">प्रत्यंतर: <strong id="live-pd">--</strong></div>
        <div class="live-dasha-item">सूक्ष्म दशा: <strong id="live-sd">--</strong></div>
      </div>
    </div>

    <div class="dasha-header-row">
      <div class="section-sub-title">1. संपूर्ण महादशाएं</div>
      <button type="button" class="dasha-toggle-btn" onclick="toggleDashaTable('table-md', this)">👁️ सभी देखें</button>
    </div>
    <table class="dasha-table show-only-active" id="table-md">
      <thead>
        <tr>
          <th style="width:30%">महादशा स्वामी</th>
          <th style="width:35%">प्रारंभ</th>
          <th style="width:35%">समाप्ति</th>
        </tr>
      </thead>
      <tbody id="mahadasha-list-body"></tbody>
    </table>

    <div class="dasha-header-row">
      <div class="section-sub-title">2. वर्तमान अंतर्दशाएं</div>
      <button type="button" class="dasha-toggle-btn" onclick="toggleDashaTable('table-ad', this)">👁️ सभी देखें</button>
    </div>
    <table class="dasha-table show-only-active" id="table-ad">
      <thead>
        <tr>
          <th style="width:30%">अंतर्दशा नाथ</th>
          <th style="width:35%">प्रारंभ</th>
          <th style="width:35%">समाप्ति</th>
        </tr>
      </thead>
      <tbody id="antardasha-list-body"></tbody>
    </table>

    <div class="dasha-header-row">
      <div class="section-sub-title">3. वर्तमान प्रत्यंतर दशाएं</div>
      <button type="button" class="dasha-toggle-btn" onclick="toggleDashaTable('table-pd', this)">👁️ सभी देखें</button>
    </div>
    <table class="dasha-table show-only-active" id="table-pd">
      <thead>
        <tr>
          <th style="width:30%">प्रत्यंतर नाथ</th>
          <th style="width:35%">प्रारंभ</th>
          <th style="width:35%">समाप्ति</th>
        </tr>
      </thead>
      <tbody id="pratyantardasha-list-body">
        <tr><td>--</td><td>--</td><td>--</td></tr>
      </tbody>
    </table>

    <div class="dasha-header-row">
      <div class="section-sub-title">4. वर्तमान सूक्ष्म दशाएं (Sukshma Dasha)</div>
      <button type="button" class="dasha-toggle-btn" onclick="toggleDashaTable('table-sd', this)">👁️ सभी देखें</button>
    </div>
    <table class="dasha-table show-only-active" id="table-sd">
      <thead>
        <tr>
          <th style="width:30%">सूक्ष्म नाथ</th>
          <th style="width:35%">प्रारंभ</th>
          <th style="width:35%">समाप्ति</th>
        </tr>
      </thead>
      <tbody id="sukshmadasha-list-body">
        <tr><td>--</td><td>--</td><td>--</td></tr>
      </tbody>
    </table>
  </div>

  <div class="kundli-summary">
    <div class="summary-title">📋 आपकी कुण्डली का संक्षिप्त सार</div>

    <div class="summary-grid">
      <div class="summary-card"><span class="label">🌙 जन्म राशि</span><span class="value" id="summary-rashi">--</span></div>
      <div class="summary-card"><span class="label">⭐ नक्षत्र</span><span class="value" id="summary-nakshatra">--</span></div>
      <div class="summary-card" id="gandmool-card"><span class="label">🌿 गण्ड मूल</span><span class="value" id="summary-gandmool">--</span></div>
      <div class="summary-card"><span class="label">⬆️ लग्न</span><span class="value" id="summary-lagna">--</span></div>
      <div class="summary-card" id="manglik-card"><span class="label">🔥 मंगलिक स्थिति</span><span class="value" id="summary-manglik">--</span></div>
      <div class="summary-card" id="sadesati-card"><span class="label">🪐 शनि साढ़ेसाती</span><span class="value" id="summary-sadesati">--</span></div>
      <div class="summary-card" id="dhaiya-card"><span class="label">📿 शनि ढैय्या</span><span class="value" id="summary-dhaiya">--</span></div>
      <div class="summary-card"><span class="label">🔮 वर्तमान महादशा</span><span class="value" id="summary-md">--</span></div>

      <div class="summary-gemstone">
        <span class="summary-gem-label">💎 अनुशंसित रत्न:</span>
        <strong id="summary-stone">--</strong>
        <span id="summary-stone-detail">--</span>
      </div>
    </div>

    <div class="recommend-box">
      <div class="recommend-title">🌼 लग्न के अनुसार अनुशंसित बातें</div>
      <div class="recommend-grid">
        <div class="recommend-item"><strong>🎨 शुभ रंग:</strong> <span id="rec-color">--</span></div>
        <div class="recommend-item"><strong>📅 शुभ दिन:</strong> <span id="rec-day">--</span></div>
        <div class="recommend-item"><strong>🔢 अनुकूल अंक:</strong> <span id="rec-number">--</span></div>
        <div class="recommend-item"><strong>🪙 अनुकूल धातु:</strong> <span id="rec-metal">--</span></div>
        <div class="recommend-item"><strong>🕉️ आराध्य ग्रह:</strong> <span id="rec-planet">--</span></div>
        <div class="recommend-item"><strong>📿 अनुशंसित रुद्राक्ष:</strong> <span id="rec-rudraksh">--</span></div>
        <div class="recommend-item" style="grid-column: 1 / -1;"><strong>🌸 सामान्य सुझाव:</strong> <span id="rec-tip">--</span></div>
      </div>
    </div>

    <div class="dasha-analysis">
      <div class="analysis-title" id="title-md-analysis">📚 1. महादशा का विस्तृत विश्लेषण</div>
      <div class="analysis-grid">
        <div class="analysis-item"><strong>🏢 नौकरी / व्यवसाय:</strong> <span id="ana-job">--</span></div>
        <div class="analysis-item"><strong>📈 शेयर बाजार / निवेश संकेत:</strong> <span id="ana-stock">--</span></div>
        <div class="analysis-item"><strong>💍 विवाह / दांपत्य:</strong> <span id="ana-marriage">--</span></div>
        <div class="analysis-item"><strong>🎓 शिक्षा / कौशल:</strong> <span id="ana-education">--</span></div>
        <div class="analysis-item"><strong>✈️ यात्रा / विदेश:</strong> <span id="ana-travel">--</span></div>
        <div class="analysis-item"><strong>🩺 स्वास्थ्य संबंधी सावधानी:</strong> <span id="ana-health">--</span></div>
        <div class="analysis-item analysis-full"><strong>🕉️ महादशा विशेष उपाय:</strong> <span id="ana-remedy">--</span></div>
      </div>
    </div>

    <div class="dasha-analysis">
      <div class="analysis-title" id="title-ad-analysis">📚 2. अंतर्दशा का विस्तृत विश्लेषण</div>
      <div class="analysis-grid">
        <div class="analysis-item"><strong>🏢 नौकरी / व्यवसाय:</strong> <span id="ana-ad-job">--</span></div>
        <div class="analysis-item"><strong>📈 शेयर बाजार / निवेश संकेत:</strong> <span id="ana-ad-stock">--</span></div>
        <div class="analysis-item"><strong>💍 विवाह / दांपत्य:</strong> <span id="ana-ad-marriage">--</span></div>
        <div class="analysis-item"><strong>🎓 शिक्षा / कौशल:</strong> <span id="ana-ad-education">--</span></div>
        <div class="analysis-item"><strong>✈️ यात्रा / विदेश:</strong> <span id="ana-ad-travel">--</span></div>
        <div class="analysis-item"><strong>🩺 स्वास्थ्य संबंधी सावधानी:</strong> <span id="ana-ad-health">--</span></div>
        <div class="analysis-item analysis-full"><strong>🕉️ अंतर्दशा विशेष उपाय:</strong> <span id="ana-ad-remedy">--</span></div>
      </div>
    </div>

    <div class="dasha-analysis">
      <div class="analysis-title" id="title-pd-analysis">📚 3. प्रत्यंतर दशा का विस्तृत विश्लेषण</div>
      <div class="analysis-grid">
        <div class="analysis-item"><strong>🏢 नौकरी / व्यवसाय:</strong> <span id="ana-pd-job">--</span></div>
        <div class="analysis-item"><strong>📈 शेयर बाजार / निवेश संकेत:</strong> <span id="ana-pd-stock">--</span></div>
        <div class="analysis-item"><strong>💍 विवाह / दांपत्य:</strong> <span id="ana-pd-marriage">--</span></div>
        <div class="analysis-item"><strong>🎓 शिक्षा / कौशल:</strong> <span id="ana-pd-education">--</span></div>
        <div class="analysis-item"><strong>✈️ यात्रा / विदेश:</strong> <span id="ana-pd-travel">--</span></div>
        <div class="analysis-item"><strong>🩺 स्वास्थ्य संबंधी सावधानी:</strong> <span id="ana-pd-health">--</span></div>
        <div class="analysis-item analysis-full"><strong>🕉️ प्रत्यंतर विशेष उपाय:</strong> <span id="ana-pd-remedy">--</span></div>
      </div>
    </div>

    <div class="dasha-analysis">
      <div class="analysis-title" id="title-sd-analysis">📚 4. सूक्ष्म दशा का विस्तृत विश्लेषण</div>
      <div class="analysis-grid">
        <div class="analysis-item"><strong>🏢 नौकरी / व्यवसाय:</strong> <span id="ana-sd-job">--</span></div>
        <div class="analysis-item"><strong>📈 शेयर बाजार / निवेश संकेत:</strong> <span id="ana-sd-stock">--</span></div>
        <div class="analysis-item"><strong>💍 विवाह / दांपत्य:</strong> <span id="ana-sd-marriage">--</span></div>
        <div class="analysis-item"><strong>🎓 शिक्षा / कौशल:</strong> <span id="ana-sd-education">--</span></div>
        <div class="analysis-item"><strong>✈️ यात्रा / विदेश:</strong> <span id="ana-sd-travel">--</span></div>
        <div class="analysis-item"><strong>🩺 स्वास्थ्य संबंधी सावधानी:</strong> <span id="ana-sd-health">--</span></div>
        <div class="analysis-item analysis-full"><strong>🕉️ सूक्ष्म दशा विशेष उपाय:</strong> <span id="ana-sd-remedy">--</span></div>
      </div>
    </div>

    <div class="dasha-analysis" style="background:#fffef8; border:2px solid #ebd2a4;">
      <div class="analysis-title" id="title-synthesis-analysis" style="color:#7a1c1c;">✨ 5. चारों दशाओं का संयुक्त विस्तृत विश्लेषण</div>
      <div class="analysis-grid">
        <div class="analysis-item"><strong>💼 करियर व कर्मक्षेत्र:</strong> <span id="synthesis-career">--</span></div>
        <div class="analysis-item"><strong>💰 धन, लाभ व संपत्ति:</strong> <span id="synthesis-money">--</span></div>
        <div class="analysis-item"><strong>❤️ परिवार व दांपत्य:</strong> <span id="synthesis-family">--</span></div>
        <div class="analysis-item"><strong>🧠 मानसिक स्थिति व सोच:</strong> <span id="synthesis-mind">--</span></div>
        <div class="analysis-item"><strong>⚠️ मुख्य सावधानी:</strong> <span id="synthesis-caution">--</span></div>
        <div class="analysis-item"><strong>⏳ तात्कालिक सूक्ष्म प्रभाव:</strong> <span id="synthesis-sukshma-effect">--</span></div>
        <div class="analysis-item analysis-full" style="background:#fdf6e7;"><strong>🕉️ महा-उपाय:</strong> <span id="synthesis-remedy">--</span></div>
      </div>
    </div>

    <div class="dasha-analysis">
      <div class="analysis-title">🪐 6. वर्तमान गोचर का विस्तृत विश्लेषण</div>
      <div class="analysis-grid">
        <div class="analysis-item"><strong>🏢 नौकरी / व्यवसाय:</strong> <span id="ana-tr-job">वर्तमान गोचर के प्रभाव से कार्यक्षेत्र में स्थिरता और नए उत्तरदायित्व मिल सकते हैं।</span></div>
        <div class="analysis-item"><strong>📈 शेयर बाजार / निवेश संकेत:</strong> <span id="ana-tr-stock">गोचर के ग्रहों की स्थिति के अनुसार सूझबूझ से निवेश करें।</span></div>
        <div class="analysis-item"><strong>💍 विवाह / दांपत्य:</strong> <span id="ana-tr-marriage">पारिवारिक व दांपत्य जीवन में सामंजस्य बनाए रखने का समय है।</span></div>
        <div class="analysis-item"><strong>🎓 शिक्षा / कौशल:</strong> <span id="ana-tr-education">विद्यार्थियों के लिए एकाग्रता और निरंतर प्रयास फलदायी रहेंगे।</span></div>
        <div class="analysis-item"><strong>✈️ यात्रा / विदेश:</strong> <span id="ana-tr-travel">अल्पकालिक या आवश्यक कार्य से यात्रा के योग बन रहे हैं।</span></div>
        <div class="analysis-item"><strong>🩺 स्वास्थ्य संबंधी सामान्य सावधानी:</strong> <span id="ana-tr-health">खान-पान और मौसमी बदलाव के प्रति सजग रहें।</span></div>
        <div class="analysis-item analysis-full"><strong>🕉️ विशेष सलाह / उपाय:</strong> <span id="ana-tr-remedy">नियमित रूप से इष्टदेव का स्मरण करें और संतुलित दिनचर्या अपनाएं।</span></div>
      </div>
      <div class="analysis-disclaimer">शेयर बाजार संबंधी विवरण केवल पारंपरिक ज्योतिषीय संकेत हैं; इसे निवेश की निश्चित सलाह या लाभ की गारंटी न मानें।</div>
    </div>

    <div class="ai-chat-box">
      <div class="ai-chat-title">💬 ज्योतिषशिमला AI विशेषज्ञ से परामर्श लें</div>
      <div class="ai-chat-messages" id="ai-chat-messages">
        <div class="ai-msg bot">नमस्ते! मैं ज्योतिषशिमला AI विशेषज्ञ हूँ। आपकी वर्तमान कुण्डली, चारों दशाओं और गोचर से जुड़ा कोई भी प्रश्न पूछें।</div>
      </div>
      <div class="ai-input-row">
        <input type="text" id="ai-user-input" placeholder="जैसे: मेरा करियर कैसा रहेगा, विवाह कब होगा, कौन सा रत्न पहनें..." autocomplete="off">
        <button type="button" id="ai-send-btn">पूछें</button>
      </div>
    </div>
  </div>

  <div class="final-astro-disclaimer">
    ये सुझाव केवल लग्न-आधारित पारंपरिक संकेत हैं। अंतिम निर्णय पूरी कुण्डली के विस्तृत परीक्षण के बाद करें。<br>
    रत्न, मंगलिक तथा साढ़ेसाती की जानकारी पारंपरिक ज्योतिषीय नियमों के आधार पर संकेतात्मक है।
  </div>

  <div class="brand-footer">
    🚩 ज्योतिषशिमला <span>•</span> ज्योतिष व रत्न परामर्श <span>•</span> शिमला (हिमाचल प्रदेश)
  </div>

  <div class="whatsapp-box">
    <div class="whatsapp-title">📲 कुण्डली रिपोर्ट साझा करें</div>
    <div class="whatsapp-info">जन्म विवरण, लग्न-राशि, 4-स्तरीय दशाएं, मंगलिक/साढ़ेसाती, चारों दशाओं का निचोड़ व उपाय एक क्लिक में शेयर करें।</div>
    <div class="share-buttons">
      <button class="whatsapp-button" id="btn-whatsapp">📲 WhatsApp पर कुण्डली साझा करें</button>
      <button class="jpeg-button" id="btn-jpeg">🖼️ JPEG डाउनलोड करें</button>
    </div>
  </div>
</div>

<script>
(function() {
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); }, false);
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) || (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 67 || e.keyCode === 65))) {
      e.preventDefault(); e.stopPropagation(); return false;
    }
  }, false);
})();
</script>

<script>
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
let activeLat = 31.1048;
let activeLon = 77.1734;
let activeCityName = "शिमला, Himachal Pradesh, India";
let isLiveMode = true;
let currentHoroscopeState = {};

const rashis = ["मेष","वृषभ","मिथुन","कर्क","सिंह","कन्या","तुला","वृश्चिक","धनु","मकर","कुंभ","मीन"];
const nakshatras = ["अश्विनी","भरणी","कृत्तिका","रोहिणी","मृगशिरा","आर्द्रा","पुनर्वसु","पुष्य","अश्लेषा","मघा","पूर्वाफाल्गुनी","उत्तराफाल्गुनी","हस्त","चित्रा","स्वाती","विशाखा","अनुराधा","ज्येष्ठा","मूल","पूर्वाषाढ़ा","उत्तराषाढ़ा","श्रवण","धनिष्ठा","शतभिषा","पूर्वाभाद्रपद","उत्तराभाद्रपद","रेवती"];
const dashaLords = [
  { name: "केतु (Ketu)", years: 7 },
  { name: "शुक्र (Venus)", years: 20 },
  { name: "सूर्य (Sun)", years: 6 },
  { name: "चन्द्र (Moon)", years: 10 },
  { name: "मंगल (Mars)", years: 7 },
  { name: "राहु (Rahu)", years: 18 },
  { name: "गुरु (Jupiter)", years: 16 },
  { name: "शनि (Saturn)", years: 19 },
  { name: "बुध (Mercury)", years: 17 }
];

const houseAnchorCoords = {
  1:{sX:250,sY:125,pX:250,pY:185},
  2:{sX:160,sY:118,pX:160,pY:140},
  3:{sX:120,sY:135,pX:140,pY:185},
  4:{sX:125,sY:250,pX:185,pY:250},
  5:{sX:120,sY:365,pX:140,pY:315},
  6:{sX:215,sY:382,pX:160,pY:360},
  7:{sX:250,sY:375,pX:250,pY:315},
  8:{sX:285,sY:382,pX:340,pY:360},
  9:{sX:380,sY:365,pX:360,pY:315},
  10:{sX:375,sY:250,pX:315,pY:250},
  11:{sX:380,sY:135,pX:360,pY:185},
  12:{sX:285,sY:118,pX:340,pY:140}
};

const planetClasses = {
  Lagna:"planet-lagna", Surya:"planet-surya", Chandra:"planet-chandra",
  Mangal:"planet-mangal", Budha:"planet-budha", Guru:"planet-guru",
  Shukra:"planet-shukra", Shani:"planet-shani", Rahu:"planet-rahu", Ketu:"planet-ketu"
};

const lagnaRecommendations = {
  0:{color:"लाल, केसरिया",day:"मंगलवार",number:"9",metal:"तांबा",planet:"मंगल",rudraksh:"3 मुखी रुद्राक्ष",tip:"साहस, अनुशासन और नियमित व्यायाम पर ध्यान दें।"},
  1:{color:"हरा, हल्का पीला",day:"शुक्रवार",number:"6",metal:"सोना",planet:"शुक्र",rudraksh:"6 मुखी रुद्राक्ष",tip:"सौंदर्य, कला और संबंधों में संतुलन रखें।"},
  2:{color:"हरा, हल्का आसमानी",day:"बुधवार",number:"5",metal:"कांसा",planet:"बुध",rudraksh:"4 मुखी रुद्राक्ष",tip:"अध्ययन, संवाद और कौशल-विकास को प्राथमिकता दें।"},
  3:{color:"सफेद, क्रीम",day:"सोमवार",number:"2",metal:"चांदी",planet:"चन्द्रमा",rudraksh:"2 मुखी रुद्राक्ष",tip:"मन की शांति, परिवार और नियमित दिनचर्या बनाए रखें।"},
  4:{color:"सुनहरा, पीला",day:"रविवार",number:"1",metal:"सोना",planet:"सूर्य",rudraksh:"1 मुखी या 12 मुखी रुद्राक्ष",tip:"आत्मविश्वास के साथ विनम्रता और नेतृत्व विकसित करें।"},
  5:{color:"हरा, हल्का पीला",day:"बुधवार",number:"5",metal:"सोना",planet:"बुध",rudraksh:"4 मुखी रुद्राक्ष",tip:"व्यवहारिक सोच, लेखन और व्यवस्थित कार्यशैली लाभकारी।"},
  6:{color:"सफेद, गुलाबी",day:"शुक्रवार",number:"6",metal:"चांदी",planet:"शुक्र",rudraksh:"6 मुखी रुद्राक्ष",tip:"संबंधों, कला और सौंदर्य में संतुलन बनाए रखें।"},
  7:{color:"लाल, केसरिया",day:"मंगलवार",number:"9",metal:"तांबा",planet:"मंगल",rudraksh:"3 मुखी रुद्राक्ष",tip:"धैर्य रखें और क्रोध में निर्णय लेने से बचें।"},
  8:{color:"पीला, हल्का लाल",day:"गुरुवार",number:"3",metal:"सोना",planet:"गुरु",rudraksh:"5 मुखी रुद्राक्ष",tip:"ज्ञान, गुरुजनों का सम्मान और धर्म-अध्ययन लाभकारी।"},
  9:{color:"नीला, धूसर",day:"शनिवार",number:"8",metal:"लोहा/पंचधातु",planet:"शनि",rudraksh:"7 मुखी रुद्राक्ष",tip:"अनुशासन, सेवा और दीर्घकालीन योजनाओं पर ध्यान दें।"},
  10:{color:"नीला, आसमानी",day:"शनिवार",number:"8",metal:"पंचधातु",planet:"शनि",rudraksh:"7 मुखी रुद्राक्ष",tip:"नई सोच के साथ धैर्य रखें और जल्दबाजी से बचें।"},
  11:{color:"पीला, हल्का क्रीम",day:"गुरुवार",number:"3",metal:"सोना",planet:"गुरु",rudraksh:"5 मुखी रुद्राक्ष",tip:"आध्यात्मिकता, सेवा और सकारात्मक संगति को महत्व दें।"}
};

const gandMoolNakshatras = ["अश्विनी","अश्लेषा","मघा","ज्येष्ठा","मूल","रेवती"];

const gemstoneByAsc = {
  0: { stone: "मूंगा (Red Coral)", planet: "मंगल", metal: "सोना/तांबा", finger: "अनामिका" },
  1: { stone: "पन्ना (Emerald)", planet: "बुध", metal: "सोना", finger: "कनिष्ठिका" },
  2: { stone: "पन्ना (Emerald)", planet: "बुध", metal: "सोना/कांसा", finger: "कनिष्ठिका" },
  3: { stone: "मोती (Pearl)", planet: "चन्द्रमा", metal: "चाँदी", finger: "कनिष्ठिका" },
  4: { stone: "माणिक्य (Ruby)", planet: "सूर्य", metal: "सोना/तांबा", finger: "अनामिका" },
  5: { stone: "पन्ना (Emerald)", planet: "बुध", metal: "सोना", finger: "कनिष्ठिका" },
  6: { stone: "हीरा / ओपल (Diamond/Opal)", planet: "शुक्र", metal: "चाँदी/प्लैटिनम", finger: "अनामिका" },
  7: { stone: "मूंगा (Red Coral)", planet: "मंगल", metal: "सोना/तांबा", finger: "अनामिका" },
  8: { stone: "पुखराज (Yellow Sapphire)", planet: "गुरु", metal: "सोना", finger: "तर्जनी" },
  9: { stone: "नीलम (Blue Sapphire)", planet: "शनि", metal: "पंचधातु/चाँदी", finger: "मध्यमा" },
  10: { stone: "नीलम (Blue Sapphire)", planet: "शनि", metal: "पंचधातु/चाँदी", finger: "मध्यमा" },
  11: { stone: "पुखराज (Yellow Sapphire)", planet: "गुरु", metal: "सोना", finger: "तर्जनी" }
};

const planetTheme = {
  "सूर्य":{job:"नौकरी में पदोन्नति और नेतृत्व की भूमिका प्रबल होगी।",stock:"बड़े व स्थापित क्षेत्रों में सोच-समझकर निवेश करें।",marriage:"दांपत्य में परस्पर सम्मान और समझ महत्वपूर्ण रहेगी।",education:"प्रतियोगी परीक्षा व उच्च अध्ययन में सफलता के योग।",travel:"शासकीय या व्यापारिक उद्देश्यों से यात्रा संभव।",health:"नेत्र, हृदय व पित्त संबंधी स्वास्थ्य का ध्यान रखें।",remedy:"प्रातः काल सूर्य देव को जल अर्पित करें व आदित्य हृदय स्तोत्र का पाठ करें।"},
  "चन्द्र":{job:"सार्वजनिक सेवा व रचनात्मक कार्यों में नए अवसर।",stock:"अस्थिरता से बचें, भावनाओं में आकर ट्रेडिंग न करें।",marriage:"भावनात्मक निकटता व आपसी सहयोग बढ़ेगा।",education:"एकाग्रता व स्मरण शक्ति का विकास होगा।",travel:"जल स्थल या धार्मिक स्थानों की सुखद यात्रा।",health:"नींद, कफ व मानसिक तनाव का विशेष ध्यान रखें।",remedy:"सोमवार को 'ॐ नमः शिवाय' का जप करें और दूध/चावल का दान करें।"},
  "मंगल":{job:"कार्यक्षेत्र में प्रतिस्पर्धा में विजय व नेतृत्व वृद्धि।",stock:"सट्टेबाज़ी व अत्यधिक जोखिम भरे ट्रेड से दूर रहें।",marriage:"वाणी पर नियंत्रण रखें, अनावश्यक तनाव से बचें।",education:"तकनीकी व इंजीनियरिंग के विद्यार्थियों को लाभ।",travel:"साहसिक या कार्य संबंधी त्वरित यात्रा।",health:"रक्त विकार, चोट व ज्वर से सावधान रहें।",remedy:"मंगलवार को सुंदरकांड का पाठ करें और हनुमान जी को सिंदूर चढ़ाएं।"},
  "बुध":{job:"नेटवर्किंग व नई तकनीकों के प्रयोग से पदोन्नति।",stock:"डेटा व अनुसंधान आधारित निवेश में अच्छा लाभ।",marriage:"आपसी संवाद व समझ से दांपत्य मधुर रहेगा।",education:"गणित, कंप्यूटर व तर्कशास्त्र में उत्कृष्ट प्रदर्शन।",travel:"व्यापारिक व अध्ययन संबंधी छोटी यात्राएं।",health:"त्वचा, नसों व अनिद्रा की समस्या से बचें।",remedy:"बुधवार को श्री गणेश जी को दूर्वा अर्पित करें व 'ॐ बुं बुधाय नमः' जपें।"},
  "गुरु":{job:"वरिष्ठों व गुरुजनों के सहयोग से बड़ी पदोन्नति।",stock:"दीर्घकालिक व सुरक्षित क्षेत्रों में निवेश अत्यंत शुभ।",marriage:"विवाह योग्य जातकों के लिए विवाह के उत्तम योग।",education:"उच्च शिक्षा व शोध कार्यों में अभूतपूर्व सफलता।",travel:"धार्मिक, तीर्थ या शैक्षणिक यात्रा का योग।",health:"पाचन, यकृत (लिवर) व वजन का ध्यान रखें।",remedy:"गुरुवार को विष्णु सहस्रनाम का पाठ करें और चने की दाल दान करें।"},
  "शुक्र":{job:"रचनात्मक व जनसंपर्क कार्यों में विशेष प्रशंसा।",stock:"कंज्यूमर गुड्स व मीडिया सेक्टर में लाभ।",marriage:"प्रेम व दांपत्य जीवन में मधुरता और प्रगाढ़ता।",education:"डिज़ाइनिंग, संगीत व कला में विशेष रुचि।",travel:"मनोरंजक व आनंददायक पर्यटन यात्राएं।",health:"मधुमेह व जठर संबंधी समस्याओं से सतर्क रहें।",remedy:"शुक्रवार को श्री सूक्त का पाठ करें और कन्याओं को मिठाई दें।"},
  "शनि":{job:"अनुशासन व समर्पण से पद प्रतिष्ठा मजबूत होगी।",stock:"दीर्घकालिक सिप (SIP) व मूल्य निवेश अपनाएं।",marriage:"व्यवहारिक दृष्टिकोण रखें, एक-दूसरे का संबल बनें।",education:"कठिन विषयों में अथक प्रयास से सफलता मिलेगी।",travel:"दूरदराज या कार्य सम्बंधी जिम्मेदारियों की यात्रा।",health:"वायु विकार, जोड़ों के दर्द व थकान से सावधान रहें।",remedy:"शनिवार को पीपल के वृक्ष के नीचे सरसों के तेल का दीपक जलाएं और हनुमान चालीसा पढ़ें।"},
  "राहु":{job:"विदेशी कंपनियों व ऑनलाइन क्षेत्र में प्रगति।",stock:"अत्यधिक वोलाटाइल शेयरों से दूर रहें।",marriage:"पारस्परिक विश्वास बनाए रखना अत्यंत आवश्यक।",education:"नवोन्मेष व आधुनिक विषयों में अभिरुचि।",travel:"अचानक या विदेश यात्रा के मजबूत योग।",health:"अनिद्रा, घबराहट व खान-पान की अनियमितता से बचें।",remedy:"नियमित रूप से शिव जी का जल-अभिषेक करें और राहु स्तोत्र का पाठ करें।"},
  "केतु":{job:"रिसर्च व विशेषज्ञता वाले क्षेत्रों में विशेष लाभ।",stock:"बिना पूर्ण जानकारी के शेयर बाजार में निवेश न करें।",marriage:"भावनाओं को स्पष्ट रूप से अभिव्यक्त करें।",education:"गहन अध्ययन व वैज्ञानिक सोच में वृद्धि।",travel:"आध्यात्मिक स्थानों या एकान्त यात्राओं का योग।",health:"अज्ञात भय, एलर्जिक समस्याओं से सतर्क रहें।",remedy:"गणपति जी की उपासना करें और कुत्तों को भोजन दें।"}
};

const dailyMantras = [
  '☀️ <strong>रविवार विशेष:</strong> "ॐ सूर्याय नमः"',
  '🕉️ <strong>सोमवार विशेष:</strong> "ॐ नमः शिवाय"',
  '🔱 <strong>मंगलवार विशेष:</strong> "ॐ हं हनुमते नमः"',
  '🌿 <strong>बुधवार विशेष:</strong> "ॐ गं गणपतये नमः"',
  '🛕 <strong>गुरुवार विशेष:</strong> "ॐ बृं बृहस्पतये नमः"',
  '🌸 <strong>शुक्रवार विशेष:</strong> "ॐ श्रीं महालक्ष्म्यै नमः"',
  '⚖️ <strong>शनिवार विशेष:</strong> "ॐ शं शनैश्चराय नमः"'
];

function toggleDashaTable(tableId, btn) {
  const table = document.getElementById(tableId);
  if (!table) return;
  if (table.classList.contains("show-only-active")) {
    table.classList.remove("show-only-active");
    btn.textContent = "🙈 केवल वर्तमान छुपाएं";
  } else {
    table.classList.add("show-only-active");
    btn.textContent = "👁️ सभी देखें";
  }
}
window.toggleDashaTable = toggleDashaTable;

function normalizeDeg(d){ d %= 360; return d < 0 ? d + 360 : d; }
function toRad(d){ return d * Math.PI / 180; }
function toDeg(r){ return r * 180 / Math.PI; }

function formatLatitude(lat,digits=6){ const n = Number(lat); return !Number.isFinite(n) ? "--" : Math.abs(n).toFixed(digits) + "° " + (n>=0 ? "N" : "S"); }
function formatLongitude(lon,digits=6){ const n = Number(lon); return !Number.isFinite(n) ? "--" : Math.abs(n).toFixed(digits) + "° " + (n>=0 ? "E" : "W"); }
function formatCoordinates(lat,lon,digits=6){ return formatLatitude(lat,digits) + ", " + formatLongitude(lon,digits); }
function formatDate(d){ if(!d) return "--"; return String(d.getDate()).padStart(2,"0") + "/" + String(d.getMonth()+1).padStart(2,"0") + "/" + d.getFullYear(); }
function setText(id, text){ const el = document.getElementById(id); if(el){ el.textContent = (text === undefined || text === null || text === "") ? "--" : text; } }

function setDefaultDateTimeInputs() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const dateInput = document.getElementById("custom-date");
  if(dateInput && !dateInput.value) { dateInput.value = \`\${yyyy}-\${mm}-\${dd}\`; }

  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const timeInput = document.getElementById("custom-time");
  if(timeInput && !timeInput.value) { timeInput.value = \`\${hh}:\${min}:\${ss}\`; }
}

function getSelectedDateObject() {
  const dateStr = document.getElementById("custom-date")?.value;
  const timeStr = document.getElementById("custom-time")?.value;
  if (!dateStr) return new Date();
  const [y, m, d] = dateStr.split('-').map(Number);
  let hh = 0, mm = 0, ss = 0;
  if (timeStr) {
    const tParts = timeStr.split(':').map(Number);
    hh = tParts[0] || 0; mm = tParts[1] || 0; ss = tParts[2] || 0;
  }
  return new Date(y, m - 1, d, hh, mm, ss);
}

function parseISTInputsToJulianDay() {
  const dt = getSelectedDateObject();
  const utcDate = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours() - 5, dt.getMinutes() - 30, dt.getSeconds()));
  return 2440587.5 + utcDate.getTime()/86400000;
}

function getJulianDate(date){ return 2440587.5 + date.getTime()/86400000; }
function addYearsToDateAccurate(baseDate, decimalYears) {
  const result = new Date(baseDate.getTime());
  result.setTime(result.getTime() + (decimalYears * 365.2425 * 24 * 60 * 60 * 1000));
  return result;
}

function getLahiriAyanamsa(T){ return 23.853056 + 1.396971*T + 0.0003086*T*T; }
function angularSeparation(a,b){ const d = Math.abs(normalizeDeg(a)-normalizeDeg(b)); return Math.min(d, 360-d); }

function calculatePlanetsFallback(jd, lat, lon){
  const T = (jd - 2451545.0) / 36525.0;
  const ayanamsa = getLahiriAyanamsa(T);
  const L0 = 280.46646 + 36000.76983 * T;
  const M_sun = toRad(357.52911 + 35999.05029 * T);
  const sun = normalizeDeg(L0 + 1.914602 * Math.sin(M_sun) + 0.019993 * Math.sin(2 * M_sun) - ayanamsa);
  const moon = normalizeDeg(218.3164477 + 481267.88123421 * T - ayanamsa);
  const mars = normalizeDeg(355.433 + 19140.30 * T - ayanamsa);
  const mercury = normalizeDeg(sun + 12 * Math.sin(toRad(sun)));
  const jupiter = normalizeDeg(34.351 + 3034.90 * T - ayanamsa);
  const venus = normalizeDeg(sun + 25 * Math.sin(toRad(sun + 40)));
  const saturn = normalizeDeg(50.077 + 1222.11 * T - ayanamsa);
  const rahu = normalizeDeg(125.0445 - 1934.13626 * T - ayanamsa);
  const ketu = normalizeDeg(rahu + 180);
  const d = jd - 2451545.0;
  const asc = normalizeDeg(toDeg(Math.atan2(Math.cos(toRad(normalizeDeg(280.46061837 + 360.98564736629 * d) + lon)), -Math.sin(toRad(normalizeDeg(280.46061837 + 360.98564736629 * d) + lon)) * Math.cos(toRad(23.439291)) - Math.tan(toRad(lat)) * Math.sin(toRad(23.439291)))) - ayanamsa);

  return [
    buildPlanetObj("Lagna", "लग्न", asc),
    buildPlanetObj("Surya", "सूर्य", sun),
    buildPlanetObj("Chandra", "चन्द्रमा", moon),
    buildPlanetObj("Mangal", "मंगल", mars),
    buildPlanetObj("Budha", "बुध", mercury),
    buildPlanetObj("Guru", "गुरु", jupiter),
    buildPlanetObj("Shukra", "शुक्र", venus),
    buildPlanetObj("Shani", "शनि", saturn),
    buildPlanetObj("Rahu", "राहु", rahu, true),
    buildPlanetObj("Ketu", "केतु", ketu, true)
  ];
}

function getNavamsaRashiIndex(absDeg) {
  const normDeg = normalizeDeg(absDeg);
  const rashi = Math.floor(normDeg / 30);
  const remDeg = normDeg % 30;
  const navamsaPart = Math.floor(remDeg / (30 / 9));
  const elementGroup = rashi % 3;
  let startSign = rashi;
  if (elementGroup === 1) startSign = (rashi + 8) % 12;
  else if (elementGroup === 2) startSign = (rashi + 4) % 12;
  return (startSign + navamsaPart) % 12;
}

function buildPlanetObj(id, name, absoluteDeg, retro=false, combust=false){
  let rashiIdx = Math.floor(absoluteDeg/30);
  let rem = absoluteDeg%30;
  let deg = String(Math.floor(rem)).padStart(2,"0") + ":" + String(Math.floor((rem-Math.floor(rem))*60)).padStart(2,"0");
  let nakIdx = Math.floor(absoluteDeg/(360/27));
  let pada = Math.floor((absoluteDeg%(360/27))/(360/108)) + 1;
  return { id, name, rashiIdx, deg, absoluteDeg, nak: nakshatras[nakIdx%27] + " (" + pada + ")", retro, combust, label: name + (retro ? "*" : "") + (combust ? "(अ)" : "") };
}

function makeSwissPlanet(id, name, lon, speed){
  return buildPlanetObj(id, name, normalizeDeg(lon), Number(speed) < 0, false);
}

function applyCombustion(data) {
  const sun = data.find(x => x.id === "Surya");
  if(!sun) return;
  const combustOrbs = {Budha:14, Shukra:10, Mangal:17, Guru:11, Shani:15};
  data.forEach(p => {
    if(combustOrbs[p.id] && angularSeparation(p.absoluteDeg, sun.absoluteDeg) <= combustOrbs[p.id]) {
      p.combust = true;
      p.label = p.name + (p.retro ? "*" : "") + "(अ)";
    }
  });
}

function renderPlanetaryTable(data) {
  const tbody = document.getElementById("planetary-table-body"); 
  if(!tbody) return;
  tbody.innerHTML = "";
  data.forEach(x => {
    const tr = document.createElement("tr");
    tr.className = (planetClasses[x.id] || "") + " " + (x.retro || x.combust ? "special-planet retro-combust-bg" : "");
    tr.innerHTML = \`<td>\${x.name}\${x.retro?"*":""}\${x.combust?"(अ)":""}</td><td>\${rashis[x.rashiIdx]||"--"}</td><td>\${x.deg||"--"}</td><td>\${x.nak||"--"}</td>\`;
    tbody.appendChild(tr);
  });
}

async function calculatePositionsForDate(targetDate){
  let data = [];
  let asc = 0;
  let transitSaturnRashi = 0;
  let isSwissEphActive = false;
  const jd = isLiveMode ? getJulianDate(new Date()) : parseISTInputsToJulianDay();

  if (window.swissEphLoaded && window.sweInstance) {
    try {
      const swe = window.sweInstance;
      if (typeof swe.set_sid_mode === "function") { swe.set_sid_mode(swe.SE_SIDM_LAHIRI, 0, 0); }
      const flag = swe.SEFLG_SWIEPH | swe.SEFLG_SIDEREAL;
      const ids = { Sun: swe.SE_SUN, Moon: swe.SE_MOON, Mercury: swe.SE_MERCURY, Venus: swe.SE_VENUS, Mars: swe.SE_MARS, Jupiter: swe.SE_JUPITER, Saturn: swe.SE_SATURN, MeanNode: swe.SE_MEAN_NODE };
      const raw = {};
      for (const k of Object.keys(ids)) {
        const r = swe.calc_ut(jd, ids[k], flag);
        raw[k] = { lon: normalizeDeg(Number(r[0])), speed: Number(r[3] || 0) };
      }
      const houses = swe.houses_ex(jd, activeLat, activeLon, "P", flag);
      asc = normalizeDeg(Number(houses?.ascmc?.[0] || houses?.[0] || 0));

      data = [
        buildPlanetObj("Lagna", "लग्न", asc),
        makeSwissPlanet("Surya", "सूर्य", raw.Sun.lon, raw.Sun.speed),
        makeSwissPlanet("Chandra", "चन्द्रमा", raw.Moon.lon, raw.Moon.speed),
        makeSwissPlanet("Mangal", "मंगल", raw.Mars.lon, raw.Mars.speed),
        makeSwissPlanet("Budha", "बुध", raw.Mercury.lon, raw.Mercury.speed),
        makeSwissPlanet("Guru", "गुरु", raw.Jupiter.lon, raw.Jupiter.speed),
        makeSwissPlanet("Shukra", "शुक्र", raw.Venus.lon, raw.Venus.speed),
        makeSwissPlanet("Shani", "शनि", raw.Saturn.lon, raw.Saturn.speed),
        buildPlanetObj("Rahu", "राहु", raw.MeanNode.lon, true),
        buildPlanetObj("Ketu", "केतु", normalizeDeg(raw.MeanNode.lon + 180), true)
      ];
      const rSat = swe.calc_ut(getJulianDate(new Date()), swe.SE_SATURN, flag);
      transitSaturnRashi = Math.floor(normalizeDeg(Number(rSat[0])) / 30);
      isSwissEphActive = true;
    } catch(e) { isSwissEphActive = false; }
  }

  if (!isSwissEphActive) {
    data = calculatePlanetsFallback(jd, activeLat, activeLon);
    asc = data.find(p => p.id === "Lagna").absoluteDeg;
    transitSaturnRashi = Math.floor(calculatePlanetsFallback(getJulianDate(new Date()), activeLat, activeLon).find(p => p.id === "Shani").absoluteDeg / 30);
  }

  const status = document.getElementById("swisseph-status");
  if (status) {
    status.innerHTML = isSwissEphActive ? "<span style='color:#1b5e20; font-weight:800;'>✓ स्विस एफेमेरिस (सटीक लाहिरी) सक्रिय</span>" : "<span style='color:#7a1c1c; font-weight:800;'>⚡ मानक वैदिक गणित इंजन सक्रिय</span>";
  }

  applyCombustion(data);
  renderPlanetaryTable(data);
  renderSVGChart(asc, data, "kundli");
  renderNavamsaChart(data, asc);
  
  const moonObj = data.find(p => p.id === "Chandra");
  const dasha = calculateDetailedVimshottari(moonObj ? moonObj.absoluteDeg : 0, isLiveMode ? targetDate : getSelectedDateObject(), new Date());
  updateKundliSummary(data, asc, dasha.md, dasha.ad, dasha.pd, dasha.sd, transitSaturnRashi);
}

window.triggerKundliUpdate = function() { calculatePositionsForDate(getSelectedDateObject()); };

function calculateDetailedVimshottari(moonDegree, birthDate, evaluationDate = new Date()){
  const bDate = birthDate instanceof Date ? birthDate : new Date(birthDate);
  const eDate = evaluationDate instanceof Date ? evaluationDate : new Date(evaluationDate);
  const span = 360 / 27;
  const nakIndex = Math.floor(moonDegree / span);
  const elapsedFraction = (moonDegree % span) / span;
  const firstIndex = nakIndex % 9;
  const firstLord = dashaLords[firstIndex];
  let currentStart = addYearsToDateAccurate(bDate, -(firstLord.years * elapsedFraction));

  const mdBody = document.getElementById("mahadasha-list-body");
  const adBody = document.getElementById("antardasha-list-body");
  const pdBody = document.getElementById("pratyantardasha-list-body");
  const sdBody = document.getElementById("sukshmadasha-list-body");
  if (mdBody) mdBody.innerHTML = ""; if (adBody) adBody.innerHTML = ""; if (pdBody) pdBody.innerHTML = ""; if (sdBody) sdBody.innerHTML = "";

  let currentMD = null, currentAD = null, currentPD = null, currentSD = null;
  const evalTime = eDate.getTime();

  for (let i = 0; i < 9; i++) {
    let mdIndex = (firstIndex + i) % 9;
    let mdLord = dashaLords[mdIndex];
    let mdEnd = addYearsToDateAccurate(currentStart, mdLord.years);
    let isActiveMD = evalTime >= currentStart.getTime() && evalTime < mdEnd.getTime();

    let tr = document.createElement("tr");
    if (isActiveMD) { tr.className = "dasha-row-active"; currentMD = { lord: mdLord, start: new Date(currentStart), end: new Date(mdEnd) }; }
    tr.innerHTML = \`<td>\${mdLord.name} (\${mdLord.years} वर्ष)</td><td>\${formatDate(i === 0 ? bDate : currentStart)}</td><td>\${formatDate(mdEnd)}</td>\`;
    if (mdBody) mdBody.appendChild(tr);

    if (isActiveMD) {
      let adStart = new Date(currentStart);
      for (let j = 0; j < 9; j++) {
        let adLord = dashaLords[(mdIndex + j) % 9];
        let adYears = (mdLord.years * adLord.years) / 120.0;
        let adEnd = addYearsToDateAccurate(adStart, adYears);
        let isActiveAD = evalTime >= adStart.getTime() && evalTime < adEnd.getTime();

        let adTr = document.createElement("tr");
        if (isActiveAD) { adTr.className = "dasha-row-active"; currentAD = { lord: adLord, start: new Date(adStart), end: new Date(adEnd) }; }
        adTr.innerHTML = \`<td>\${adLord.name}</td><td>\${formatDate(adStart)}</td><td>\${formatDate(adEnd)}</td>\`;
        if (adBody) adBody.appendChild(adTr);

        if (isActiveAD) {
          let pdStart = new Date(adStart);
          for (let k = 0; k < 9; k++) {
            let pdLord = dashaLords[((mdIndex + j) % 9 + k) % 9];
            let pdYears = (adYears * pdLord.years) / 120.0;
            let pdEnd = addYearsToDateAccurate(pdStart, pdYears);
            let isActivePD = evalTime >= pdStart.getTime() && evalTime < pdEnd.getTime();

            let pdTr = document.createElement("tr");
            if (isActivePD) { pdTr.className = "dasha-row-active"; currentPD = { lord: pdLord, start: new Date(pdStart), end: new Date(pdEnd) }; }
            if (pdBody) {
              pdTr.innerHTML = \`<td>\${pdLord.name}</td><td>\${formatDate(pdStart)}</td><td>\${formatDate(pdEnd)}</td>\`;
              pdBody.appendChild(pdTr);
            }

            if (isActivePD && sdBody) {
              sdBody.innerHTML = "";
              let sdStart = new Date(pdStart);
              for (let l = 0; l < 9; l++) {
                let sdLord = dashaLords[(((mdIndex + j) % 9 + k) % 9 + l) % 9];
                let sdYears = (pdYears * sdLord.years) / 120.0;
                let sdEnd = addYearsToDateAccurate(sdStart, sdYears);
                let isActiveSD = evalTime >= sdStart.getTime() && evalTime < sdEnd.getTime();

                let sdTr = document.createElement("tr");
                if (isActiveSD) { sdTr.className = "dasha-row-active"; currentSD = { lord: sdLord, start: new Date(sdStart), end: new Date(sdEnd) }; }
                sdTr.innerHTML = \`<td>\${sdLord.name}</td><td>\${formatDate(sdStart)}</td><td>\${formatDate(sdEnd)}</td>\`;
                sdBody.appendChild(sdTr);
                sdStart = new Date(sdEnd);
              }
            }
            pdStart = new Date(pdEnd);
          }
        }
        adStart = new Date(adEnd);
      }
    }
    currentStart = new Date(mdEnd);
  }

  setText("live-md", currentMD ? currentMD.lord.name.split(" ")[0] : "--");
  setText("live-ad", currentAD ? currentAD.lord.name.split(" ")[0] : "--");
  setText("live-pd", currentPD ? currentPD.lord.name.split(" ")[0] : "--");
  setText("live-sd", currentSD ? currentSD.lord.name.split(" ")[0] : "--");
  return { md: currentMD, ad: currentAD, pd: currentPD, sd: currentSD };
}

function renderSVGChart(lagnaDeg, data, chartType="kundli"){
  const ss = document.getElementById(chartType === "kundli" ? "svg-signs" : "nav-signs");
  const sp = document.getElementById(chartType === "kundli" ? "svg-planets" : "nav-planets");
  if(!ss || !sp) return;
  ss.innerHTML = ""; sp.innerHTML = "";
  const lagnaIdx = Math.floor(lagnaDeg / 30);

  for(let h = 1; h <= 12; h++){
    let c = houseAnchorCoords[h];
    let t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute("x", c.sX); t.setAttribute("y", c.sY); t.setAttribute("text-anchor", "middle"); t.setAttribute("dominant-baseline", "central"); t.setAttribute("class", "sign-number");
    t.textContent = (lagnaIdx + h - 1) % 12 + 1;
    ss.appendChild(t);
  }

  let hp = {}; for(let h = 1; h <= 12; h++) hp[h] = [];
  data.forEach(p => { if(p.id !== "Lagna"){ hp[(p.rashiIdx - lagnaIdx + 12) % 12 + 1].push(p); } });

  for(let h = 1; h <= 12; h++){
    let list = hp[h], c = houseAnchorCoords[h];
    if(!list.length) continue;
    list.forEach((p, i) => {
      let t = document.createElementNS("http://www.w3.org/2000/svg", "text");
      t.setAttribute("x", c.pX); t.setAttribute("y", c.pY - (list.length - 1) * 6.5 + i * 13); t.setAttribute("text-anchor", "middle"); t.setAttribute("dominant-baseline", "central");
      t.setAttribute("class", (p.retro || p.combust) ? "p-main p-special" : "p-main");
      t.textContent = p.label;
      sp.appendChild(t);
    });
  }
}

function renderNavamsaChart(data, ascDeg){
  renderSVGChart(getNavamsaRashiIndex(ascDeg) * 30, data.map(p => ({ ...p, rashiIdx: getNavamsaRashiIndex(p.absoluteDeg) })), "navamsa");
}

function updateKundliSummary(data, lagnaDeg, currentMD, currentAD, currentPD, currentSD, transitSaturnRashi){
  const lagnaIdx = Math.floor(lagnaDeg / 30);
  const moon = data.find(p => p.id === "Chandra");
  if(!moon) return;
  const nak = { name: nakshatras[Math.floor(moon.absoluteDeg / (360/27)) % 27], pada: Math.floor((moon.absoluteDeg % (360/27)) / (360/108)) + 1 };
  
  const mars = data.find(p => p.id === "Mangal");
  const marsHouse = mars ? ((mars.rashiIdx - lagnaIdx + 12) % 12) + 1 : 1;
  const isManglik = [1, 2, 4, 7, 8, 12].includes(marsHouse) && !(mars.rashiIdx === 0 || mars.rashiIdx === 7 || mars.rashiIdx === 9);
  
  const saturnDiff = (transitSaturnRashi - moon.rashiIdx + 12) % 12;
  const isSadeSati = saturnDiff === 11 || saturnDiff === 0 || saturnDiff === 1;

  setText("summary-rashi", rashis[moon.rashiIdx]);
  setText("summary-nakshatra", \`\${nak.name} (\${nak.pada} चरण)\`);
  setText("summary-gandmool", gandMoolNakshatras.includes(nak.name) ? "हाँ — " + nak.name : "नहीं");
  setText("summary-lagna", rashis[lagnaIdx]);
  setText("summary-manglik", isManglik ? \`मंगलिक (\${marsHouse} भाव)\` : "मंगल दोष नहीं");
  setText("summary-sadesati", isSadeSati ? "हाँ" : "नहीं");
  setText("summary-dhaiya", [3, 7].includes(saturnDiff) ? "हाँ" : "नहीं");

  const gem = gemstoneByAsc[lagnaIdx];
  if(gem){
    setText("summary-stone", gem.stone);
    setText("summary-stone-detail", \`(\${gem.planet} हेतु, \${gem.metal} में, \${gem.finger} में धारण करें)\`);
  }

  const rec = lagnaRecommendations[lagnaIdx];
  if(rec){
    setText("rec-color", rec.color); setText("rec-day", rec.day); setText("rec-number", rec.number); setText("rec-metal", rec.metal);
    setText("rec-planet", rec.planet); setText("rec-rudraksh", rec.rudraksh); setText("rec-tip", rec.tip);
  }

  if(currentMD && currentAD){
    setText("summary-md", currentMD.lord.name);
    const mName = currentMD.lord.name.split(" ")[0];
    const aName = currentAD.lord.name.split(" ")[0];
    const pName = currentPD ? currentPD.lord.name.split(" ")[0] : aName;
    const sName = currentSD ? currentSD.lord.name.split(" ")[0] : pName;
    const theme = planetTheme[mName] || planetTheme["गुरु"];

    setText("title-md-analysis", \`📚 1. महादशा का विस्तृत विश्लेषण (\${mName})\`);
    setText("title-ad-analysis", \`📚 2. अंतर्दशा का विस्तृत विश्लेषण (\${aName})\`);
    setText("title-pd-analysis", \`📚 3. प्रत्यंतर दशा का विस्तृत विश्लेषण (\${pName})\`);
    setText("title-sd-analysis", \`📚 4. सूक्ष्म दशा का विस्तृत विश्लेषण (\${sName})\`);

    setText("ana-job", \`[\${mName} महादशा] \${theme.job}\`);
    setText("ana-stock", \`[\${mName} महादशा] \${theme.stock}\`);
    setText("ana-marriage", \`[\${mName} महादशा] \${theme.marriage}\`);
    setText("ana-education", \`[\${mName} महादशा] \${theme.education}\`);
    setText("ana-travel", \`[\${mName} महादशा] \${theme.travel}\`);
    setText("ana-health", \`[\${mName} महादशा] \${theme.health}\`);
    setText("ana-remedy", \`[\${mName} महादशा विशेष उपाय] \${theme.remedy}\`);

    currentHoroscopeState = { lagnaName: rashis[lagnaIdx], rashiName: rashis[moon.rashiIdx], mdName: mName, adName: aName, pdName: pName, sdName: sName, remedyText: theme.remedy };
  }
}

async function sendAiMessage() {
  const inputEl = document.getElementById("ai-user-input");
  const chatContainer = document.getElementById("ai-chat-messages");
  if(!inputEl || !chatContainer || !inputEl.value.trim()) return;
  const q = inputEl.value.trim(); inputEl.value = "";
  
  const uDiv = document.createElement("div"); uDiv.className = "ai-msg user"; uDiv.textContent = q; chatContainer.appendChild(uDiv);
  const bDiv = document.createElement("div"); bDiv.className = "ai-msg bot"; bDiv.textContent = "उत्तर तैयार किया जा रहा है..."; chatContainer.appendChild(bDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(() => {
    bDiv.textContent = \`आपकी वर्तमान \${currentHoroscopeState.mdName || 'महादशा'} में \${currentHoroscopeState.adName || 'अंतर्दशा'} चल रही है। \${currentHoroscopeState.lagnaName || ''} लग्न और \${currentHoroscopeState.rashiName || ''} राशि के अनुसार आपके प्रश्न "\${q}" का ज्योतिषीय संकेत है कि धैर्य और नियमित साधना के साथ प्रयास करें। विशेष लाभ हेतु \${currentHoroscopeState.remedyText || 'इष्टदेव की आराधना करें।'}\`;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 700);
}

document.addEventListener("DOMContentLoaded", () => {
  setDefaultDateTimeInputs();
  const day = new Date().getDay();
  const mantraEl = document.getElementById("daily-mantra");
  if(mantraEl) mantraEl.innerHTML = dailyMantras[day] || dailyMantras[0];

  setInterval(() => {
    const clock = document.getElementById("live-clock");
    if(clock){
      const now = new Date();
      clock.textContent = isLiveMode ? "लाइव समय: " + now.toLocaleTimeString('hi-IN') + " (" + formatDate(now) + ")" : "चयनित समय";
    }
  }, 1000);

  document.getElementById("btn-set-date")?.addEventListener("click", () => { isLiveMode = false; document.getElementById("live-indicator").style.background = "#7a1c1c"; triggerKundliUpdate(); });
  document.getElementById("btn-reset-live")?.addEventListener("click", () => { isLiveMode = true; setDefaultDateTimeInputs(); document.getElementById("live-indicator").style.background = "#2e7d32"; triggerKundliUpdate(); });
  document.getElementById("ai-send-btn")?.addEventListener("click", sendAiMessage);
  document.getElementById("ai-user-input")?.addEventListener("keypress", (e) => { if(e.key === "Enter") sendAiMessage(); });

  triggerKundliUpdate();
});
</script>

</body>
</html>
`;

export const JanmKundaliPageView: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-amber-200">
      <iframe
        srcDoc={htmlContent}
        title="Janm Kundali & Dasha Calculator"
        className="w-full min-h-[920px] border-0"
        sandbox="allow-scripts allow-same-origin allow-modals"
      />
    </div>
  );
};
