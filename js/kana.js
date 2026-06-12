// === 五十音資料 ===
// 每組是 5 列為一行的 2D 陣列；null 表示該位置沒有字（如 や行 的 い、え 缺）

const KANA_DATA = {
  'hira-basic': {
    title: '平假名 清音',
    rows: [
      [['あ','a'],['い','i'],['う','u'],['え','e'],['お','o']],
      [['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko']],
      [['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so']],
      [['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to']],
      [['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no']],
      [['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho']],
      [['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo']],
      [['や','ya'],null,['ゆ','yu'],null,['よ','yo']],
      [['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro']],
      [['わ','wa'],null,null,null,['を','wo']],
      [['ん','n'],null,null,null,null]
    ]
  },
  'hira-dakuten': {
    title: '平假名 濁音 / 半濁音',
    rows: [
      [['が','ga'],['ぎ','gi'],['ぐ','gu'],['げ','ge'],['ご','go']],
      [['ざ','za'],['じ','ji'],['ず','zu'],['ぜ','ze'],['ぞ','zo']],
      [['だ','da'],['ぢ','ji'],['づ','zu'],['で','de'],['ど','do']],
      [['ば','ba'],['び','bi'],['ぶ','bu'],['べ','be'],['ぼ','bo']],
      [['ぱ','pa'],['ぴ','pi'],['ぷ','pu'],['ぺ','pe'],['ぽ','po']]
    ]
  },
  'hira-yoon': {
    title: '平假名 拗音',
    rows: [
      [['きゃ','kya'],['きゅ','kyu'],['きょ','kyo']],
      [['しゃ','sha'],['しゅ','shu'],['しょ','sho']],
      [['ちゃ','cha'],['ちゅ','chu'],['ちょ','cho']],
      [['にゃ','nya'],['にゅ','nyu'],['にょ','nyo']],
      [['ひゃ','hya'],['ひゅ','hyu'],['ひょ','hyo']],
      [['みゃ','mya'],['みゅ','myu'],['みょ','myo']],
      [['りゃ','rya'],['りゅ','ryu'],['りょ','ryo']],
      [['ぎゃ','gya'],['ぎゅ','gyu'],['ぎょ','gyo']],
      [['じゃ','ja'],['じゅ','ju'],['じょ','jo']],
      [['びゃ','bya'],['びゅ','byu'],['びょ','byo']],
      [['ぴゃ','pya'],['ぴゅ','pyu'],['ぴょ','pyo']]
    ]
  },
  'kata-basic': {
    title: '片假名 清音',
    rows: [
      [['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o']],
      [['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko']],
      [['サ','sa'],['シ','shi'],['ス','su'],['セ','se'],['ソ','so']],
      [['タ','ta'],['チ','chi'],['ツ','tsu'],['テ','te'],['ト','to']],
      [['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no']],
      [['ハ','ha'],['ヒ','hi'],['フ','fu'],['ヘ','he'],['ホ','ho']],
      [['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo']],
      [['ヤ','ya'],null,['ユ','yu'],null,['ヨ','yo']],
      [['ラ','ra'],['リ','ri'],['ル','ru'],['レ','re'],['ロ','ro']],
      [['ワ','wa'],null,null,null,['ヲ','wo']],
      [['ン','n'],null,null,null,null]
    ]
  },
  'kata-dakuten': {
    title: '片假名 濁音 / 半濁音',
    rows: [
      [['ガ','ga'],['ギ','gi'],['グ','gu'],['ゲ','ge'],['ゴ','go']],
      [['ザ','za'],['ジ','ji'],['ズ','zu'],['ゼ','ze'],['ゾ','zo']],
      [['ダ','da'],['ヂ','ji'],['ヅ','zu'],['デ','de'],['ド','do']],
      [['バ','ba'],['ビ','bi'],['ブ','bu'],['ベ','be'],['ボ','bo']],
      [['パ','pa'],['ピ','pi'],['プ','pu'],['ペ','pe'],['ポ','po']]
    ]
  },
  'kata-yoon': {
    title: '片假名 拗音',
    rows: [
      [['キャ','kya'],['キュ','kyu'],['キョ','kyo']],
      [['シャ','sha'],['シュ','shu'],['ショ','sho']],
      [['チャ','cha'],['チュ','chu'],['チョ','cho']],
      [['ニャ','nya'],['ニュ','nyu'],['ニョ','nyo']],
      [['ヒャ','hya'],['ヒュ','hyu'],['ヒョ','hyo']],
      [['ミャ','mya'],['ミュ','myu'],['ミョ','myo']],
      [['リャ','rya'],['リュ','ryu'],['リョ','ryo']],
      [['ギャ','gya'],['ギュ','gyu'],['ギョ','gyo']],
      [['ジャ','ja'],['ジュ','ju'],['ジョ','jo']],
      [['ビャ','bya'],['ビュ','byu'],['ビョ','byo']],
      [['ピャ','pya'],['ピュ','pyu'],['ピョ','pyo']]
    ]
  }
};

// 平面化單一群組為陣列（用於測驗隨機抽題）
function flattenKana(group) {
  const data = KANA_DATA[group];
  const result = [];
  for (const row of data.rows) {
    for (const cell of row) {
      if (cell) result.push({ kana: cell[0], romaji: cell[1] });
    }
  }
  return result;
}

// 取得測驗用的整套平假名（清音 + 濁音 + 拗音）
function getAllHiragana() {
  return [
    ...flattenKana('hira-basic'),
    ...flattenKana('hira-dakuten'),
    ...flattenKana('hira-yoon')
  ];
}

function getAllKatakana() {
  return [
    ...flattenKana('kata-basic'),
    ...flattenKana('kata-dakuten'),
    ...flattenKana('kata-yoon')
  ];
}

// 依範圍取假名 pool：'all' / 'basic'(清音) / 'dakuten'(濁音+半濁音) / 'yoon'(拗音)
function getHiraganaByRange(range) {
  if (range === 'basic')   return flattenKana('hira-basic');
  if (range === 'dakuten') return flattenKana('hira-dakuten');
  if (range === 'yoon')    return flattenKana('hira-yoon');
  return getAllHiragana();
}
function getKatakanaByRange(range) {
  if (range === 'basic')   return flattenKana('kata-basic');
  if (range === 'dakuten') return flattenKana('kata-dakuten');
  if (range === 'yoon')    return flattenKana('kata-yoon');
  return getAllKatakana();
}
