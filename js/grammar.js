// === N5 文法 (50+ 條) ===
// 結構：{ pattern, short, explain, examples: [{jp, kana, romaji, cn}] }

const GRAMMAR_DATA = [
  {
    pattern: '〜は〜です',
    level: 'N5',
    short: 'A 是 B（最基本的肯定句）',
    explain: '助詞「は」用來提示句子的主題，「です」表示斷定，整個句型相當於中文的「A 是 B」。「は」當助詞時念作 wa，不是 ha。',
    examples: [
      { jp:'私は学生です。', kana:'わたしはがくせいです。', romaji:'Watashi wa gakusei desu.', cn:'我是學生。' },
      { jp:'これは本です。', kana:'これはほんです。', romaji:'Kore wa hon desu.', cn:'這是書。' }
    ]
  },
  {
    pattern: '〜じゃありません / 〜ではありません',
    level: 'N5',
    short: '不是 B（です的否定）',
    explain: '「です」的否定型；「じゃ」是「では」的口語形。日常對話多用「じゃありません」，正式場合用「ではありません」。',
    examples: [
      { jp:'私は先生じゃありません。', kana:'わたしはせんせいじゃありません。', romaji:'Watashi wa sensei ja arimasen.', cn:'我不是老師。' },
      { jp:'これは私のではありません。', kana:'これはわたしのではありません。', romaji:'Kore wa watashi no de wa arimasen.', cn:'這不是我的。' }
    ]
  },
  {
    pattern: '〜は〜ですか',
    level: 'N5',
    short: '疑問句（〜是〜嗎？）',
    explain: '在句尾加上「か」就變成疑問句。日文書寫不需要問號，但口語語尾要上揚。',
    examples: [
      { jp:'あなたは日本人ですか。', kana:'あなたはにほんじんですか。', romaji:'Anata wa nihonjin desu ka.', cn:'你是日本人嗎？' },
      { jp:'これは何ですか。', kana:'これはなんですか。', romaji:'Kore wa nan desu ka.', cn:'這是什麼？' }
    ]
  },
  {
    pattern: '〜も〜です',
    level: 'N5',
    short: '〜也是〜',
    explain: '「も」表示「也」，取代「は」表示主題的相同性質。',
    examples: [
      { jp:'私も学生です。', kana:'わたしもがくせいです。', romaji:'Watashi mo gakusei desu.', cn:'我也是學生。' },
      { jp:'田中さんも日本人です。', kana:'たなかさんもにほんじんです。', romaji:'Tanaka-san mo nihonjin desu.', cn:'田中也是日本人。' }
    ]
  },
  {
    pattern: '名詞の名詞',
    level: 'N5',
    short: '所屬／屬性的「的」',
    explain: '「の」連接兩個名詞，表示所屬、來源、種類等，相當於中文的「的」。',
    examples: [
      { jp:'私の本です。', kana:'わたしのほんです。', romaji:'Watashi no hon desu.', cn:'我的書。' },
      { jp:'日本語の先生です。', kana:'にほんごのせんせいです。', romaji:'Nihongo no sensei desu.', cn:'日語的老師。' }
    ]
  },
  {
    pattern: 'これ・それ・あれ',
    level: 'N5',
    short: '指示代名詞（這個／那個／那個）',
    explain: 'これ＝離我近；それ＝離對方近；あれ＝離雙方都遠。「どれ」是疑問形「哪一個」。',
    examples: [
      { jp:'これは時計です。', kana:'これはとけいです。', romaji:'Kore wa tokei desu.', cn:'這是手錶。' },
      { jp:'あれは何ですか。', kana:'あれはなんですか。', romaji:'Are wa nan desu ka.', cn:'那是什麼？' }
    ]
  },
  {
    pattern: 'この・その・あの＋名詞',
    level: 'N5',
    short: '連體詞「這個…／那個…」',
    explain: '修飾後面的名詞，後面一定要接名詞（不能單獨使用）。',
    examples: [
      { jp:'この本は面白いです。', kana:'このほんはおもしろいです。', romaji:'Kono hon wa omoshiroi desu.', cn:'這本書很有趣。' },
      { jp:'あの人は誰ですか。', kana:'あのひとはだれですか。', romaji:'Ano hito wa dare desu ka.', cn:'那個人是誰？' }
    ]
  },
  {
    pattern: '〜が〜（主格助詞）',
    level: 'N5',
    short: '強調主語、新資訊',
    explain: '「が」標示主語，用來引入新資訊或回答疑問。「あります／います」「好き」「上手」前的主詞要用「が」。',
    examples: [
      { jp:'机の上に本があります。', kana:'つくえのうえにほんがあります。', romaji:'Tsukue no ue ni hon ga arimasu.', cn:'桌上有書。' },
      { jp:'私は猫が好きです。', kana:'わたしはねこがすきです。', romaji:'Watashi wa neko ga suki desu.', cn:'我喜歡貓。' }
    ]
  },
  {
    pattern: '〜を＋他動詞',
    level: 'N5',
    short: '受詞助詞（把／將）',
    explain: '「を」標示動作的對象。實際發音與「お」相同，但寫成「を」。',
    examples: [
      { jp:'ご飯を食べます。', kana:'ごはんをたべます。', romaji:'Gohan wo tabemasu.', cn:'吃飯。' },
      { jp:'本を読みます。', kana:'ほんをよみます。', romaji:'Hon wo yomimasu.', cn:'讀書。' }
    ]
  },
  {
    pattern: '〜に（時間／到達點／對象）',
    level: 'N5',
    short: '在／到／給',
    explain: '「に」用法多元：① 具體時間點（7時に） ② 到達的地點（駅に着く） ③ 動作對象（友達に話す） ④ 存在地點（家にいる）。',
    examples: [
      { jp:'7時に起きます。', kana:'しちじにおきます。', romaji:'Shichi-ji ni okimasu.', cn:'七點起床。' },
      { jp:'学校に行きます。', kana:'がっこうにいきます。', romaji:'Gakkou ni ikimasu.', cn:'去學校。' },
      { jp:'母に手紙を書きます。', kana:'ははにてがみをかきます。', romaji:'Haha ni tegami wo kakimasu.', cn:'寫信給媽媽。' }
    ]
  },
  {
    pattern: '〜で（場所／工具／手段）',
    level: 'N5',
    short: '在／用',
    explain: '「で」用來表示動作發生的地點，或進行某動作的工具、手段。',
    examples: [
      { jp:'図書館で勉強します。', kana:'としょかんでべんきょうします。', romaji:'Toshokan de benkyou shimasu.', cn:'在圖書館學習。' },
      { jp:'バスで行きます。', kana:'ばすでいきます。', romaji:'Basu de ikimasu.', cn:'搭公車去。' }
    ]
  },
  {
    pattern: '〜へ（方向）',
    level: 'N5',
    short: '前往的方向',
    explain: '表示動作前進的方向，後接移動動詞。發音為 e，不是 he。可與「に」互換，但「へ」更強調方向。',
    examples: [
      { jp:'日本へ行きます。', kana:'にほんへいきます。', romaji:'Nihon e ikimasu.', cn:'去日本。' },
      { jp:'家へ帰ります。', kana:'いえへかえります。', romaji:'Ie e kaerimasu.', cn:'回家。' }
    ]
  },
  {
    pattern: '〜と（共同／並列）',
    level: 'N5',
    short: '和／與',
    explain: '① 表示共同進行動作的對象 ② 並列名詞時相當於「和」（完全列舉）。',
    examples: [
      { jp:'友達と映画を見ます。', kana:'ともだちとえいがをみます。', romaji:'Tomodachi to eiga wo mimasu.', cn:'和朋友看電影。' },
      { jp:'本と鉛筆があります。', kana:'ほんとえんぴつがあります。', romaji:'Hon to enpitsu ga arimasu.', cn:'有書和鉛筆。' }
    ]
  },
  {
    pattern: '〜から〜まで',
    level: 'N5',
    short: '從〜到〜（時間／場所）',
    explain: '「から」表示起點，「まで」表示終點。時間和地點皆可使用。',
    examples: [
      { jp:'9時から5時まで働きます。', kana:'くじからごじまではたらきます。', romaji:'Ku-ji kara go-ji made hatarakimasu.', cn:'從九點工作到五點。' },
      { jp:'家から学校まで歩きます。', kana:'いえからがっこうまであるきます。', romaji:'Ie kara gakkou made arukimasu.', cn:'從家走到學校。' }
    ]
  },
  {
    pattern: '〜や〜など',
    level: 'N5',
    short: '舉例（部分列舉）',
    explain: '「や」並列名詞，表示部分列舉（其它還有），常與「など」（等等）一起用。',
    examples: [
      { jp:'机の上に本やノートなどがあります。', kana:'つくえのうえにほんやのーとなどがあります。', romaji:'Tsukue no ue ni hon ya nooto nado ga arimasu.', cn:'桌上有書和筆記本等等。' }
    ]
  },
  {
    pattern: 'い形容詞＋名詞',
    level: 'N5',
    short: 'い形容詞修飾名詞',
    explain: 'い形容詞直接接名詞，不需要任何助詞。',
    examples: [
      { jp:'高い山。', kana:'たかいやま。', romaji:'Takai yama.', cn:'高山。' },
      { jp:'美味しい料理。', kana:'おいしいりょうり。', romaji:'Oishii ryouri.', cn:'好吃的料理。' }
    ]
  },
  {
    pattern: 'な形容詞＋な＋名詞',
    level: 'N5',
    short: 'な形容詞修飾名詞',
    explain: 'な形容詞接名詞時要加上「な」。',
    examples: [
      { jp:'静かな部屋。', kana:'しずかなへや。', romaji:'Shizuka na heya.', cn:'安靜的房間。' },
      { jp:'有名な人。', kana:'ゆうめいなひと。', romaji:'Yuumei na hito.', cn:'有名的人。' }
    ]
  },
  {
    pattern: 'い形容詞的活用（〜くないです／〜かったです）',
    level: 'N5',
    short: 'い形容詞的否定與過去',
    explain: '否定：去掉い加くないです。過去：去掉い加かったです。過去否定：くなかったです。例外：いい→よくない／よかった。',
    examples: [
      { jp:'高くないです。', kana:'たかくないです。', romaji:'Takakunai desu.', cn:'不貴。' },
      { jp:'楽しかったです。', kana:'たのしかったです。', romaji:'Tanoshikatta desu.', cn:'(過去)很開心。' }
    ]
  },
  {
    pattern: 'な形容詞的活用（〜じゃないです／〜でした）',
    level: 'N5',
    short: 'な形容詞的否定與過去',
    explain: '否定：〜じゃないです（じゃありません）。過去：〜でした。過去否定：じゃなかったです（じゃありませんでした）。',
    examples: [
      { jp:'元気じゃないです。', kana:'げんきじゃないです。', romaji:'Genki ja nai desu.', cn:'沒有精神。' },
      { jp:'有名でした。', kana:'ゆうめいでした。', romaji:'Yuumei deshita.', cn:'(過去)很有名。' }
    ]
  },
  {
    pattern: '動詞ます形',
    level: 'N5',
    short: '動詞的禮貌肯定',
    explain: '表示禮貌、現在或未來的習慣性動作。基本句型：〜を／〜に＋動詞ます。',
    examples: [
      { jp:'毎日コーヒーを飲みます。', kana:'まいにちこーひーをのみます。', romaji:'Mainichi koohii wo nomimasu.', cn:'每天喝咖啡。' },
      { jp:'明日学校へ行きます。', kana:'あしたがっこうへいきます。', romaji:'Ashita gakkou e ikimasu.', cn:'明天去學校。' }
    ]
  },
  {
    pattern: '動詞ません',
    level: 'N5',
    short: '動詞的禮貌否定（現在）',
    explain: '把「ます」改成「ません」，表示不做、不會做。',
    examples: [
      { jp:'お酒を飲みません。', kana:'おさけをのみません。', romaji:'Osake wo nomimasen.', cn:'不喝酒。' },
      { jp:'肉を食べません。', kana:'にくをたべません。', romaji:'Niku wo tabemasen.', cn:'不吃肉。' }
    ]
  },
  {
    pattern: '動詞ました',
    level: 'N5',
    short: '動詞的禮貌過去（肯定）',
    explain: '把「ます」改成「ました」，表示過去做了。',
    examples: [
      { jp:'昨日映画を見ました。', kana:'きのうえいがをみました。', romaji:'Kinou eiga wo mimashita.', cn:'昨天看了電影。' }
    ]
  },
  {
    pattern: '動詞ませんでした',
    level: 'N5',
    short: '動詞的禮貌過去（否定）',
    explain: '過去沒做的禮貌否定形。',
    examples: [
      { jp:'昨日勉強しませんでした。', kana:'きのうべんきょうしませんでした。', romaji:'Kinou benkyou shimasen deshita.', cn:'昨天沒有讀書。' }
    ]
  },
  {
    pattern: '〜ませんか',
    level: 'N5',
    short: '邀請（要不要…？）',
    explain: '禮貌地邀請對方一起做某事，相當於「要不要…？」',
    examples: [
      { jp:'一緒にご飯を食べませんか。', kana:'いっしょにごはんをたべませんか。', romaji:'Issho ni gohan wo tabemasen ka.', cn:'要不要一起吃飯？' }
    ]
  },
  {
    pattern: '〜ましょう / 〜ましょうか',
    level: 'N5',
    short: '邀約／提議（一起…吧）',
    explain: '「〜ましょう」表示「一起做…吧」；「〜ましょうか」較委婉，徵詢對方意見。',
    examples: [
      { jp:'行きましょう。', kana:'いきましょう。', romaji:'Ikimashou.', cn:'走吧／一起去吧。' },
      { jp:'手伝いましょうか。', kana:'てつだいましょうか。', romaji:'Tetsudaimashou ka.', cn:'我來幫忙好嗎？' }
    ]
  },
  {
    pattern: '動詞て形',
    level: 'N5',
    short: '動詞中止形（連接用）',
    explain: 'て形是日語動詞的中介形，連接句子或變化成各種文法。例：食べる→食べて、行く→行って、する→して、来る→来て。',
    examples: [
      { jp:'起きて、顔を洗います。', kana:'おきて、かおをあらいます。', romaji:'Okite, kao wo araimasu.', cn:'起床然後洗臉。' }
    ]
  },
  {
    pattern: '〜ています',
    level: 'N5',
    short: '正在進行／持續狀態',
    explain: '① 動作正在進行 ② 持續狀態（住んでいます／結婚しています）',
    examples: [
      { jp:'今ご飯を食べています。', kana:'いまごはんをたべています。', romaji:'Ima gohan wo tabete imasu.', cn:'正在吃飯。' },
      { jp:'東京に住んでいます。', kana:'とうきょうにすんでいます。', romaji:'Toukyou ni sunde imasu.', cn:'住在東京。' }
    ]
  },
  {
    pattern: '〜てください',
    level: 'N5',
    short: '請（做某事）',
    explain: '禮貌地請求對方做某動作。',
    examples: [
      { jp:'ちょっと待ってください。', kana:'ちょっとまってください。', romaji:'Chotto matte kudasai.', cn:'請稍等一下。' },
      { jp:'もう一度言ってください。', kana:'もういちどいってください。', romaji:'Mou ichido itte kudasai.', cn:'請再說一次。' }
    ]
  },
  {
    pattern: '〜てもいいです',
    level: 'N5',
    short: '允許（可以…）',
    explain: '徵求或給予許可。疑問形「〜てもいいですか」是「可以…嗎？」',
    examples: [
      { jp:'写真を撮ってもいいですか。', kana:'しゃしんをとってもいいですか。', romaji:'Shashin wo totte mo ii desu ka.', cn:'可以拍照嗎？' }
    ]
  },
  {
    pattern: '〜てはいけません',
    level: 'N5',
    short: '禁止（不可以…）',
    explain: '表示禁止某行為。較口語可說「〜ちゃいけません」。',
    examples: [
      { jp:'ここでタバコを吸ってはいけません。', kana:'ここでたばこをすってはいけません。', romaji:'Koko de tabako wo sutte wa ikemasen.', cn:'這裡不可以抽菸。' }
    ]
  },
  {
    pattern: '〜なければなりません',
    level: 'N5',
    short: '必須（非…不可）',
    explain: '表示義務或必要性，「不…不行」。簡略形：〜なきゃ／〜ないと。',
    examples: [
      { jp:'明日早く起きなければなりません。', kana:'あしたはやくおきなければなりません。', romaji:'Ashita hayaku okinakereba narimasen.', cn:'明天必須早起。' }
    ]
  },
  {
    pattern: '〜なくてもいいです',
    level: 'N5',
    short: '不必（不用做也可以）',
    explain: '表示沒有必要做某事。',
    examples: [
      { jp:'明日来なくてもいいです。', kana:'あしたこなくてもいいです。', romaji:'Ashita konakute mo ii desu.', cn:'明天不來也沒關係。' }
    ]
  },
  {
    pattern: '〜たいです',
    level: 'N5',
    short: '想要做（第一人稱）',
    explain: '動詞ます形去ます加上たい。表達自己的願望。對方則用「〜たがっています」。',
    examples: [
      { jp:'日本へ行きたいです。', kana:'にほんへいきたいです。', romaji:'Nihon e ikitai desu.', cn:'我想去日本。' },
      { jp:'寿司を食べたいです。', kana:'すしをたべたいです。', romaji:'Sushi wo tabetai desu.', cn:'我想吃壽司。' }
    ]
  },
  {
    pattern: '〜が欲しいです',
    level: 'N5',
    short: '想要（某個東西）',
    explain: '表示想要某物。對象用「が」標示，否定為「欲しくないです」。',
    examples: [
      { jp:'新しい車が欲しいです。', kana:'あたらしいくるまがほしいです。', romaji:'Atarashii kuruma ga hoshii desu.', cn:'想要新車。' }
    ]
  },
  {
    pattern: '動詞辭書形（普通形）',
    level: 'N5',
    short: '常體現在肯定',
    explain: '即動詞原形（書く、食べる、する、来る…），用於朋友、日記、各種句型基底。',
    examples: [
      { jp:'毎日本を読む。', kana:'まいにちほんをよむ。', romaji:'Mainichi hon wo yomu.', cn:'每天看書。' }
    ]
  },
  {
    pattern: '〜ない形',
    level: 'N5',
    short: '常體現在否定',
    explain: '動詞普通形的否定。一類動詞 u→a＋ない（書く→書かない），二類去る加ない（食べる→食べない），する→しない、来る→こない。',
    examples: [
      { jp:'今日は学校へ行かない。', kana:'きょうはがっこうへいかない。', romaji:'Kyou wa gakkou e ikanai.', cn:'今天不去學校。' }
    ]
  },
  {
    pattern: '〜た形',
    level: 'N5',
    short: '常體過去肯定',
    explain: 'て形把「て」換成「た」就是た形。表示過去做了某事，也是各種句型的基底（〜たことがある等）。',
    examples: [
      { jp:'昨日寿司を食べた。', kana:'きのうすしをたべた。', romaji:'Kinou sushi wo tabeta.', cn:'昨天吃了壽司。' }
    ]
  },
  {
    pattern: '〜ことができます',
    level: 'N5',
    short: '能夠／會（做某事）',
    explain: '辭書形＋ことができます。表示能力或可能。也可用「動詞可能形」。',
    examples: [
      { jp:'日本語を話すことができます。', kana:'にほんごをはなすことができます。', romaji:'Nihongo wo hanasu koto ga dekimasu.', cn:'會說日語。' }
    ]
  },
  {
    pattern: '〜のが好きです / 〜のが上手です',
    level: 'N5',
    short: '喜歡做／擅長做',
    explain: '辭書形＋のが好き／上手／下手。',
    examples: [
      { jp:'歌を歌うのが好きです。', kana:'うたをうたうのがすきです。', romaji:'Uta wo utau no ga suki desu.', cn:'喜歡唱歌。' }
    ]
  },
  {
    pattern: '〜前に / 〜あとで',
    level: 'N5',
    short: '在…之前／之後',
    explain: '辭書形＋前に＝在…之前；た形＋あとで＝…之後。名詞接的話則是「名詞＋の前に／のあとで」。',
    examples: [
      { jp:'食べる前に手を洗います。', kana:'たべるまえにてをあらいます。', romaji:'Taberu mae ni te wo araimasu.', cn:'吃飯前洗手。' },
      { jp:'仕事のあとで映画を見ます。', kana:'しごとのあとでえいがをみます。', romaji:'Shigoto no ato de eiga wo mimasu.', cn:'下班後看電影。' }
    ]
  },
  {
    pattern: '〜時（とき）',
    level: 'N5',
    short: '〜的時候',
    explain: '辭書形／た形／い形容詞／な形容詞（な）／名詞＋の＋時。表示某動作或狀態進行的時間點。',
    examples: [
      { jp:'子供の時、よく泳ぎました。', kana:'こどものとき、よくおよぎました。', romaji:'Kodomo no toki, yoku oyogimashita.', cn:'小時候常常游泳。' }
    ]
  },
  {
    pattern: '〜から（理由）',
    level: 'N5',
    short: '因為〜',
    explain: '常體或禮貌體＋から，表示理由或原因，用於主觀的解釋。',
    examples: [
      { jp:'寒いから、コートを着ます。', kana:'さむいから、こーとをきます。', romaji:'Samui kara, kooto wo kimasu.', cn:'因為很冷，所以穿外套。' }
    ]
  },
  {
    pattern: '〜が、（逆接）',
    level: 'N5',
    short: '雖然…但是',
    explain: '在句中作為轉折，比「でも／しかし」更柔和。前句後句以「が、」連接。',
    examples: [
      { jp:'日本語は難しいですが、面白いです。', kana:'にほんごはむずかしいですが、おもしろいです。', romaji:'Nihongo wa muzukashii desu ga, omoshiroi desu.', cn:'日語雖然難，但是有趣。' }
    ]
  },
  {
    pattern: '〜でしょう',
    level: 'N5',
    short: '推測（…吧）',
    explain: '表示說話者的推測或徵求對方同意，比「です」更帶有不確定意味。',
    examples: [
      { jp:'明日は雨でしょう。', kana:'あしたはあめでしょう。', romaji:'Ashita wa ame deshou.', cn:'明天會下雨吧。' }
    ]
  },
  {
    pattern: '〜と思います',
    level: 'N5',
    short: '我認為…',
    explain: '常體＋と思います，表示主觀的想法或意見。',
    examples: [
      { jp:'彼は来ると思います。', kana:'かれはくるとおもいます。', romaji:'Kare wa kuru to omoimasu.', cn:'我認為他會來。' }
    ]
  },
  {
    pattern: '〜と言いました / 〜と言っていました',
    level: 'N5',
    short: '〜說了…',
    explain: '引用別人的話。直接引用用「」，間接引用用常體＋と言いました。',
    examples: [
      { jp:'田中さんは「はい」と言いました。', kana:'たなかさんは「はい」といいました。', romaji:'Tanaka-san wa "hai" to iimashita.', cn:'田中說「是」。' },
      { jp:'彼は明日来ると言っていました。', kana:'かれはあしたくるといっていました。', romaji:'Kare wa ashita kuru to itte imashita.', cn:'他說明天會來。' }
    ]
  },
  {
    pattern: '助數詞（一つ・一人・一個…）',
    level: 'N5',
    short: '量詞（東西、人、物品）',
    explain: '日語量詞需根據對象選擇：人＝人（にん／り），東西＝つ／個（こ），動物＝匹（ひき），紙＝枚（まい），書＝冊（さつ），機器＝台（だい），長條物＝本（ほん）。',
    examples: [
      { jp:'りんごを三つください。', kana:'りんごをみっつください。', romaji:'Ringo wo mittsu kudasai.', cn:'請給我三顆蘋果。' },
      { jp:'切手を二枚買いました。', kana:'きってをにまいかいました。', romaji:'Kitte wo ni-mai kaimashita.', cn:'買了兩張郵票。' }
    ]
  },
  {
    pattern: '〜より〜のほうが',
    level: 'N5',
    short: '比較（A 比 B 更…）',
    explain: '「Aより Bのほうが〜」＝B 比 A 更〜。',
    examples: [
      { jp:'バスより電車のほうが速いです。', kana:'ばすよりでんしゃのほうがはやいです。', romaji:'Basu yori densha no hou ga hayai desu.', cn:'電車比公車快。' }
    ]
  },
  {
    pattern: '〜の中で〜が一番〜',
    level: 'N5',
    short: '最高級（在…之中最…）',
    explain: '表示在某範圍內最…。「中」可以替換成具體名詞。',
    examples: [
      { jp:'果物の中でりんごが一番好きです。', kana:'くだもののなかでりんごがいちばんすきです。', romaji:'Kudamono no naka de ringo ga ichiban suki desu.', cn:'水果中最喜歡蘋果。' }
    ]
  },
  {
    pattern: 'もう / まだ',
    level: 'N5',
    short: '已經 / 還沒',
    explain: '「もう＋過去」＝已經…了；「まだ＋否定」＝還沒…。',
    examples: [
      { jp:'もう食べました。', kana:'もうたべました。', romaji:'Mou tabemashita.', cn:'已經吃了。' },
      { jp:'まだ食べていません。', kana:'まだたべていません。', romaji:'Mada tabete imasen.', cn:'還沒吃。' }
    ]
  },
  {
    pattern: '〜だけ',
    level: 'N5',
    short: '只（限定）',
    explain: '表示限定的數量、範圍或對象，用法較中性。',
    examples: [
      { jp:'水だけ飲みます。', kana:'みずだけのみます。', romaji:'Mizu dake nomimasu.', cn:'只喝水。' }
    ]
  },
  {
    pattern: '〜しか〜ない',
    level: 'N5',
    short: '只…（強調少／不足）',
    explain: '與「だけ」不同，「しか」後面必接否定，帶有「僅有這些、不足」的語氣。',
    examples: [
      { jp:'百円しかありません。', kana:'ひゃくえんしかありません。', romaji:'Hyaku-en shika arimasen.', cn:'只有一百日圓而已。' }
    ]
  },
  {
    pattern: 'あります / います',
    level: 'N5',
    short: '存在動詞（在／有）',
    explain: '無生命物用「あります」，有生命物（人、動物）用「います」。場所助詞用「に」。',
    examples: [
      { jp:'机の上に本があります。', kana:'つくえのうえにほんがあります。', romaji:'Tsukue no ue ni hon ga arimasu.', cn:'桌上有書。' },
      { jp:'庭に犬がいます。', kana:'にわにいぬがいます。', romaji:'Niwa ni inu ga imasu.', cn:'院子裡有狗。' }
    ]
  },

  // ================================================
  // ====              N4 文法 (~80 條)            ====
  // ================================================

  {
    pattern: '動詞辭書形',
    level: 'N4',
    short: '常體現在肯定（普通形）',
    explain: '所有 N4 句型大量使用普通形（辭書形／ない形／た形／なかった形），對話時對親近的人使用，書寫時用於各種子句、句型基底。',
    examples: [
      { jp:'毎朝ジョギングする。', kana:'まいあさじょぎんぐする。', romaji:'Maiasa jogingu suru.', cn:'每天早上慢跑。' }
    ]
  },
  {
    pattern: '動詞ない形',
    level: 'N4',
    short: '常體現在否定',
    explain: '第一類（u→a）＋ない；第二類去る加ない；する→しない、来る→こない。N4 後接「〜ないでください」「〜なきゃ」等大量句型。',
    examples: [
      { jp:'今日は学校へ行かない。', kana:'きょうはがっこうへいかない。', romaji:'Kyou wa gakkou e ikanai.', cn:'今天不去學校。' }
    ]
  },
  {
    pattern: '動詞た形 / なかった形',
    level: 'N4',
    short: '常體過去肯定 / 否定',
    explain: 'て形把て換成た就是た形；なかった是ない形把い改成かった。',
    examples: [
      { jp:'昨日寿司を食べた。', kana:'きのうすしをたべた。', romaji:'Kinou sushi wo tabeta.', cn:'昨天吃了壽司。' },
      { jp:'宿題をしなかった。', kana:'しゅくだいをしなかった。', romaji:'Shukudai wo shinakatta.', cn:'沒做作業。' }
    ]
  },
  {
    pattern: '動詞可能形',
    level: 'N4',
    short: '會／能夠',
    explain: '一類動詞 u→e＋る（書く→書ける）；二類去る加られる（食べる→食べられる）；する→できる、来る→こられる。對象用「が」標示。',
    examples: [
      { jp:'日本語が話せます。', kana:'にほんごがはなせます。', romaji:'Nihongo ga hanasemasu.', cn:'會說日語。' },
      { jp:'刺身が食べられますか。', kana:'さしみがたべられますか。', romaji:'Sashimi ga taberaremasu ka.', cn:'敢吃生魚片嗎？' }
    ]
  },
  {
    pattern: '動詞意志形 〜よう / 〜おう',
    level: 'N4',
    short: '「我來〜吧」、「打算〜」',
    explain: '一類 u→o＋う（行く→行こう）；二類去る加よう（食べる→食べよう）；する→しよう、来る→こよう。常體「我們去吧」，或接「〜と思う」表示打算。',
    examples: [
      { jp:'もう寝よう。', kana:'もうねよう。', romaji:'Mou neyou.', cn:'差不多該睡了吧。' },
      { jp:'大学院に進もうと思っています。', kana:'だいがくいんにすすもうとおもっています。', romaji:'Daigakuin ni susumou to omotteimasu.', cn:'我打算讀研究所。' }
    ]
  },
  {
    pattern: '〜ようと思う',
    level: 'N4',
    short: '打算做…',
    explain: '意志形＋と思う，表示說話者的意志或打算。「〜ようと思っている」表示一段時間以來的計畫。',
    examples: [
      { jp:'夏休みに日本へ行こうと思います。', kana:'なつやすみににほんへいこうとおもいます。', romaji:'Natsuyasumi ni Nihon e ikou to omoimasu.', cn:'我打算暑假去日本。' }
    ]
  },
  {
    pattern: '〜つもりです',
    level: 'N4',
    short: '打算…（強烈意志）',
    explain: '辭書形＋つもりです。比「〜ようと思う」更強烈、更明確的打算。否定為「〜ないつもり」。',
    examples: [
      { jp:'来年結婚するつもりです。', kana:'らいねんけっこんするつもりです。', romaji:'Rainen kekkon suru tsumori desu.', cn:'打算明年結婚。' }
    ]
  },
  {
    pattern: '〜予定です',
    level: 'N4',
    short: '預定…（已排定）',
    explain: '辭書形／名詞の＋予定です。表示已排定的計畫，客觀程度比「つもり」高。',
    examples: [
      { jp:'明日東京へ出張する予定です。', kana:'あしたとうきょうへしゅっちょうするよていです。', romaji:'Ashita Toukyou e shucchou suru yotei desu.', cn:'明天預定到東京出差。' }
    ]
  },
  {
    pattern: '動詞受身形（被動）',
    level: 'N4',
    short: '被〜',
    explain: '一類 u→a＋れる（呼ぶ→呼ばれる）；二類去る加られる（食べる→食べられる）；する→される、来る→こられる。動作者用「に」。',
    examples: [
      { jp:'先生に褒められました。', kana:'せんせいにほめられました。', romaji:'Sensei ni homeraremashita.', cn:'被老師稱讚了。' },
      { jp:'雨に降られた。', kana:'あめにふられた。', romaji:'Ame ni furareta.', cn:'被雨淋了（迷惑受身）。' }
    ]
  },
  {
    pattern: '動詞使役形',
    level: 'N4',
    short: '讓／使〜做',
    explain: '一類 u→a＋せる（行く→行かせる）；二類去る加させる（食べる→食べさせる）；する→させる、来る→こさせる。被命令者用「を」或「に」。',
    examples: [
      { jp:'母は弟に薬を飲ませました。', kana:'はははおとうとにくすりをのませました。', romaji:'Haha wa otouto ni kusuri wo nomasemashita.', cn:'媽媽讓弟弟吃藥。' }
    ]
  },
  {
    pattern: '動詞使役受身形',
    level: 'N4',
    short: '被迫做〜',
    explain: '使役 → 受身。一類 a＋せられる（→さされる口語）；二類→させられる。語感上有「不情願被迫」的味道。',
    examples: [
      { jp:'子供のときピアノを習わされた。', kana:'こどものときぴあのをならわされた。', romaji:'Kodomo no toki piano wo narawasareta.', cn:'小時候被逼著學鋼琴。' }
    ]
  },
  {
    pattern: '動詞命令形 / 禁止形',
    level: 'N4',
    short: '命令／禁止（語氣強）',
    explain: '一類 u→e（行け）；二類去る加ろ（食べろ）；する→しろ、来る→こい。禁止：辭書形＋な（行くな）。多用於男性、警告、口號。',
    examples: [
      { jp:'早く起きろ！', kana:'はやくおきろ！', romaji:'Hayaku okiro!', cn:'快點起來！' },
      { jp:'触るな！', kana:'さわるな！', romaji:'Sawaru na!', cn:'不准碰！' }
    ]
  },
  {
    pattern: '〜なさい',
    level: 'N4',
    short: '請（給予指示／長輩對晚輩）',
    explain: '動詞ます形＋なさい，比命令形委婉，但仍帶有指示語氣。常見於父母對小孩、老師對學生、考題指示。',
    examples: [
      { jp:'早く寝なさい。', kana:'はやくねなさい。', romaji:'Hayaku nenasai.', cn:'早點睡。' }
    ]
  },
  {
    pattern: '〜ば（條件）',
    level: 'N4',
    short: '如果〜（一般／必然條件）',
    explain: '一類 u→e＋ば（行く→行けば）；二類去る加れば；い形 い→ければ；な形＋なら(ば)。常用於諺語、一般原理、假設。',
    examples: [
      { jp:'安ければ買います。', kana:'やすければかいます。', romaji:'Yasukereba kaimasu.', cn:'便宜的話就買。' },
      { jp:'春になれば桜が咲く。', kana:'はるになればさくらがさく。', romaji:'Haru ni nareba sakura ga saku.', cn:'到春天櫻花就開。' }
    ]
  },
  {
    pattern: '〜たら（條件／時間）',
    level: 'N4',
    short: '〜的話、〜之後',
    explain: '常體過去形＋ら。最口語、最常用的條件句。也可用作「〜之後就發生了」的時間連接。',
    examples: [
      { jp:'雨が降ったら、行きません。', kana:'あめがふったら、いきません。', romaji:'Ame ga futtara, ikimasen.', cn:'下雨的話就不去。' },
      { jp:'家に帰ったら、電話してください。', kana:'いえにかえったら、でんわしてください。', romaji:'Ie ni kaettara, denwa shite kudasai.', cn:'到家後請打電話。' }
    ]
  },
  {
    pattern: '〜なら',
    level: 'N4',
    short: '如果是〜的話（針對對方話題）',
    explain: '名詞／普通形＋なら。常用於對對方提出的話題給予建議或意見。',
    examples: [
      { jp:'日本へ行くなら、京都がいいですよ。', kana:'にほんへいくなら、きょうとがいいですよ。', romaji:'Nihon e iku nara, Kyouto ga ii desu yo.', cn:'要去日本的話，京都不錯喔。' }
    ]
  },
  {
    pattern: '〜と（自然/必然結果）',
    level: 'N4',
    short: '一〜就〜',
    explain: '辭書形／ない形＋と。表示前項一發生，必然出現後項；不能接意志、命令、希望句。常用於說明操作、自然現象、地理。',
    examples: [
      { jp:'このボタンを押すと、お釣りが出ます。', kana:'このぼたんをおすと、おつりがでます。', romaji:'Kono botan wo osu to, otsuri ga demasu.', cn:'按下這個按鈕，零錢就會出來。' }
    ]
  },
  {
    pattern: '〜かもしれません',
    level: 'N4',
    short: '可能、說不定',
    explain: '普通形＋かもしれません（な形／名詞要去掉だ）。比「でしょう」更不確定，可能性 30~50%。',
    examples: [
      { jp:'明日雨が降るかもしれません。', kana:'あしたあめがふるかもしれません。', romaji:'Ashita ame ga furu kamoshiremasen.', cn:'明天可能會下雨。' }
    ]
  },
  {
    pattern: '〜はずです',
    level: 'N4',
    short: '應該〜（基於根據的推測）',
    explain: '普通形＋はずです（な形＋な、名詞＋の）。表示說話者基於某種根據強烈相信會這樣。否定：〜はずがない＝不可能。',
    examples: [
      { jp:'彼は来るはずです。', kana:'かれはくるはずです。', romaji:'Kare wa kuru hazu desu.', cn:'他應該會來。' },
      { jp:'そんなはずがない。', kana:'そんなはずがない。', romaji:'Sonna hazu ga nai.', cn:'不可能那樣。' }
    ]
  },
  {
    pattern: '〜らしい',
    level: 'N4',
    short: '聽說／像〜的樣子',
    explain: '普通形＋らしい。① 客觀的傳聞、推測（聽說） ② 名詞＋らしい＝像〜般的（很有〜味）。',
    examples: [
      { jp:'田中さんは結婚するらしい。', kana:'たなかさんはけっこんするらしい。', romaji:'Tanaka-san wa kekkon suru rashii.', cn:'聽說田中要結婚了。' },
      { jp:'今日は春らしい天気だ。', kana:'きょうははるらしいてんきだ。', romaji:'Kyou wa haru rashii tenki da.', cn:'今天是很有春天感覺的天氣。' }
    ]
  },
  {
    pattern: '〜そうだ（樣態）',
    level: 'N4',
    short: '看起來〜的樣子',
    explain: '動詞ます形去ます／い形去い／な形原形＋そう。表示根據外觀的推測，「看起來好像〜」。例外：いい→よさそう、ない→なさそう。',
    examples: [
      { jp:'このケーキ、美味しそう！', kana:'このけーき、おいしそう！', romaji:'Kono keeki, oishisou!', cn:'這個蛋糕看起來好好吃！' },
      { jp:'雨が降りそうです。', kana:'あめがふりそうです。', romaji:'Ame ga furisou desu.', cn:'好像要下雨了。' }
    ]
  },
  {
    pattern: '〜そうだ（傳聞）',
    level: 'N4',
    short: '聽說〜',
    explain: '普通形＋そうだ。重點：要接「だ」連接名詞與な形（例：学生だそうだ）。表示二手資訊。',
    examples: [
      { jp:'天気予報によると、明日は雪が降るそうです。', kana:'てんきよほうによると、あしたはゆきがふるそうです。', romaji:'Tenki yohou ni yoru to, ashita wa yuki ga furu sou desu.', cn:'根據氣象預報，明天會下雪。' }
    ]
  },
  {
    pattern: '〜ようです / 〜みたいです',
    level: 'N4',
    short: '好像〜（主觀推測）',
    explain: '普通形＋ようだ（な形＋な、名詞＋の）。「みたい」是口語版（直接接名詞、な形原形）。比「らしい」更主觀。',
    examples: [
      { jp:'熱があるようです。', kana:'ねつがあるようです。', romaji:'Netsu ga aru you desu.', cn:'好像發燒了。' },
      { jp:'子供みたいだ。', kana:'こどもみたいだ。', romaji:'Kodomo mitai da.', cn:'像個小孩。' }
    ]
  },
  {
    pattern: '〜ように（目的／樣態）',
    level: 'N4',
    short: '為了〜、像〜一樣',
    explain: '辭書形／ない形＋ように，表示目的（自動詞、可能形、ない形常用），或表示樣態（像〜般）。',
    examples: [
      { jp:'忘れないようにメモします。', kana:'わすれないようにめもします。', romaji:'Wasurenai you ni memo shimasu.', cn:'為了不忘記寫筆記。' },
      { jp:'鳥のように飛びたい。', kana:'とりのようにとびたい。', romaji:'Tori no you ni tobitai.', cn:'想像鳥一樣飛。' }
    ]
  },
  {
    pattern: '〜ようになる',
    level: 'N4',
    short: '變得會〜（變化）',
    explain: '辭書形／可能形／ない形＋ようになる。表示能力或習慣的變化。',
    examples: [
      { jp:'日本語が話せるようになりました。', kana:'にほんごがはなせるようになりました。', romaji:'Nihongo ga hanaseru you ni narimashita.', cn:'變得會說日語了。' }
    ]
  },
  {
    pattern: '〜ようにする',
    level: 'N4',
    short: '努力／盡量做到〜',
    explain: '辭書形／ない形＋ようにする。表示有意識地養成某習慣。',
    examples: [
      { jp:'毎日運動するようにしています。', kana:'まいにちうんどうするようにしています。', romaji:'Mainichi undou suru you ni shiteimasu.', cn:'我盡量每天運動。' }
    ]
  },
  {
    pattern: '〜ために',
    level: 'N4',
    short: '為了〜',
    explain: '辭書形／名詞の＋ために。表示目的（後接意志動作）或原因（後接客觀結果）。',
    examples: [
      { jp:'健康のために、毎朝走っています。', kana:'けんこうのために、まいあさはしっています。', romaji:'Kenkou no tame ni, maiasa hashitteimasu.', cn:'為了健康，每天早上跑步。' }
    ]
  },
  {
    pattern: '〜のに',
    level: 'N4',
    short: '明明〜卻〜（逆接）',
    explain: '普通形＋のに（な形＋な、名詞＋な）。帶有意外、不滿、惋惜的語氣。比「が／けど」情感更強。',
    examples: [
      { jp:'勉強したのに、不合格だった。', kana:'べんきょうしたのに、ふごうかくだった。', romaji:'Benkyou shita noni, fugoukaku datta.', cn:'明明讀了書，卻沒考過。' }
    ]
  },
  {
    pattern: '〜ので',
    level: 'N4',
    short: '因為〜（客觀理由）',
    explain: '普通形＋ので（な形＋な、名詞＋な）。比「から」更客觀、更禮貌，常用於說明客觀原因。',
    examples: [
      { jp:'頭が痛いので、休みます。', kana:'あたまがいたいので、やすみます。', romaji:'Atama ga itai node, yasumimasu.', cn:'因為頭痛，所以請假。' }
    ]
  },
  {
    pattern: '〜ながら',
    level: 'N4',
    short: '一邊〜一邊〜',
    explain: '動詞ます形（去ます）＋ながら。表示同時進行兩個動作；主要動作放在後。',
    examples: [
      { jp:'音楽を聞きながら勉強する。', kana:'おんがくをききながらべんきょうする。', romaji:'Ongaku wo kikinagara benkyou suru.', cn:'一邊聽音樂一邊讀書。' }
    ]
  },
  {
    pattern: '〜たり〜たりする',
    level: 'N4',
    short: '又〜又〜、有時〜有時〜',
    explain: 'た形＋り。並列舉例多種動作（不必窮舉），常用於描述休息日的活動。',
    examples: [
      { jp:'週末は買い物したり、映画を見たりします。', kana:'しゅうまつはかいものしたり、えいがをみたりします。', romaji:'Shuumatsu wa kaimono shitari, eiga wo mitari shimasu.', cn:'週末就逛街啦、看電影啦。' }
    ]
  },
  {
    pattern: '〜たほうがいい / 〜ないほうがいい',
    level: 'N4',
    short: '最好做〜／最好不要〜',
    explain: 'た形／ない形＋ほうがいい。給對方建議的常用句型。',
    examples: [
      { jp:'もっと野菜を食べたほうがいいですよ。', kana:'もっとやさいをたべたほうがいいですよ。', romaji:'Motto yasai wo tabeta hou ga ii desu yo.', cn:'最好多吃點蔬菜喔。' },
      { jp:'タバコは吸わないほうがいい。', kana:'たばこはすわないほうがいい。', romaji:'Tabako wa suwanai hou ga ii.', cn:'最好不要抽菸。' }
    ]
  },
  {
    pattern: '〜なくちゃ / 〜なきゃ',
    level: 'N4',
    short: '必須〜（口語）',
    explain: '「〜なければならない」「〜なくてはいけない」的口語縮略，朋友間日常會話常用。',
    examples: [
      { jp:'もう帰らなきゃ。', kana:'もうかえらなきゃ。', romaji:'Mou kaeranakya.', cn:'我得回家了。' }
    ]
  },
  {
    pattern: '〜ても / 〜でも',
    level: 'N4',
    short: '即使〜也〜',
    explain: 'て形＋も。表示逆接假設或讓步。「ても」與「のに」不同——「ても」可用於假設未來，「のに」只用於已實現的事實。',
    examples: [
      { jp:'雨が降っても行きます。', kana:'あめがふってもいきます。', romaji:'Ame ga futtemo ikimasu.', cn:'就算下雨我也要去。' }
    ]
  },
  {
    pattern: '〜場合',
    level: 'N4',
    short: '〜的情況下',
    explain: '辭書形／た形／ない形／名詞の／な形＋な＋場合。比「とき」更強調假設情境，常見於說明書、規則。',
    examples: [
      { jp:'雨の場合は中止します。', kana:'あめのばあいはちゅうしします。', romaji:'Ame no baai wa chuushi shimasu.', cn:'若下雨則中止。' }
    ]
  },
  {
    pattern: '〜間に',
    level: 'N4',
    short: '在〜的期間中',
    explain: '辭書形／ている形／名詞の＋間に。表示在某時段中發生短暫動作。「間に」強調點，「間」強調整段時間。',
    examples: [
      { jp:'母が寝ている間に出かけました。', kana:'ははがねているあいだにでかけました。', romaji:'Haha ga neteiru aida ni dekakemashita.', cn:'趁媽媽睡覺時出門了。' }
    ]
  },
  {
    pattern: '〜うちに',
    level: 'N4',
    short: '趁〜的時候',
    explain: '辭書形／ない形／い形／な形＋な／名詞の＋うちに。語感「在這個狀態還在的時候做」。',
    examples: [
      { jp:'熱いうちに食べてください。', kana:'あついうちにたべてください。', romaji:'Atsui uchi ni tabete kudasai.', cn:'請趁熱吃。' },
      { jp:'忘れないうちにメモしましょう。', kana:'わすれないうちにめもしましょう。', romaji:'Wasurenai uchi ni memo shimashou.', cn:'趁還沒忘記趕快寫筆記。' }
    ]
  },
  {
    pattern: '〜ところ',
    level: 'N4',
    short: '正要〜／正在〜／剛剛〜',
    explain: '辭書形＋ところ＝正要做；ている形＋ところ＝正在做；た形＋ところ＝剛剛做完。',
    examples: [
      { jp:'これから家を出るところです。', kana:'これからいえをでるところです。', romaji:'Korekara ie wo deru tokoro desu.', cn:'我正要出門。' },
      { jp:'今食べているところです。', kana:'いまたべているところです。', romaji:'Ima tabeteiru tokoro desu.', cn:'我正在吃。' },
      { jp:'たった今着いたところです。', kana:'たったいまついたところです。', romaji:'Tatta ima tsuita tokoro desu.', cn:'剛剛才到。' }
    ]
  },
  {
    pattern: '〜たばかり',
    level: 'N4',
    short: '剛剛〜（不久前）',
    explain: 'た形＋ばかり。主觀感覺剛做完，跟客觀時間長短無關。',
    examples: [
      { jp:'去年日本に来たばかりです。', kana:'きょねんにほんにきたばかりです。', romaji:'Kyonen Nihon ni kita bakari desu.', cn:'我去年才剛來日本。' }
    ]
  },
  {
    pattern: '〜始める / 〜終わる / 〜続ける',
    level: 'N4',
    short: '開始〜／結束〜／持續〜',
    explain: 'ます形（去ます）＋始める／終わる／続ける。複合動詞，表示動作的階段。',
    examples: [
      { jp:'雨が降り始めた。', kana:'あめがふりはじめた。', romaji:'Ame ga furihajimeta.', cn:'開始下雨了。' },
      { jp:'走り続けます。', kana:'はしりつづけます。', romaji:'Hashiritsuzukemasu.', cn:'繼續跑下去。' }
    ]
  },
  {
    pattern: '〜過ぎる',
    level: 'N4',
    short: '太過〜',
    explain: '動詞ます形／い形（去い）／な形原形＋過ぎる。表示超過適度範圍，常帶負面意涵。',
    examples: [
      { jp:'食べ過ぎました。', kana:'たべすぎました。', romaji:'Tabe sugimashita.', cn:'吃太多了。' },
      { jp:'この問題は難し過ぎる。', kana:'このもんだいはむずかしすぎる。', romaji:'Kono mondai wa muzukashi sugiru.', cn:'這題太難。' }
    ]
  },
  {
    pattern: '〜やすい / 〜にくい',
    level: 'N4',
    short: '容易〜／難以〜',
    explain: 'ます形（去ます）＋やすい／にくい。形成新的い形容詞，描述事物的特性。',
    examples: [
      { jp:'この本は読みやすい。', kana:'このほんはよみやすい。', romaji:'Kono hon wa yomiyasui.', cn:'這本書很好讀。' },
      { jp:'この字は読みにくい。', kana:'このじはよみにくい。', romaji:'Kono ji wa yominikui.', cn:'這個字很難讀。' }
    ]
  },
  {
    pattern: '〜方（かた）',
    level: 'N4',
    short: '〜的做法',
    explain: 'ます形（去ます）＋方。表示某動作的方式或方法。',
    examples: [
      { jp:'漢字の書き方を教えてください。', kana:'かんじのかきかたをおしえてください。', romaji:'Kanji no kakikata wo oshiete kudasai.', cn:'請教我漢字怎麼寫。' }
    ]
  },
  {
    pattern: '〜さ / 〜み',
    level: 'N4',
    short: '形容詞名詞化',
    explain: 'い形容詞去い＋さ（客觀量度）／＋み（主觀感覺）。例：高い→高さ／高み；甘い→甘さ／甘み。',
    examples: [
      { jp:'この山の高さは3000メートルです。', kana:'このやまのたかさは3000めーとるです。', romaji:'Kono yama no takasa wa 3000 meetoru desu.', cn:'這座山的高度是 3000 公尺。' }
    ]
  },
  {
    pattern: '〜がる',
    level: 'N4',
    short: '（第三人稱）感到〜',
    explain: 'い形容詞去い／な形原形＋がる。將內心感受形容詞變成觀察動詞，用於描述「我」以外的人的感受。',
    examples: [
      { jp:'妹は寒がっています。', kana:'いもうとはさむがっています。', romaji:'Imouto wa samugatte imasu.', cn:'妹妹覺得冷。' },
      { jp:'子供がほしがっているおもちゃ。', kana:'こどもがほしがっているおもちゃ。', romaji:'Kodomo ga hoshigatteiru omocha.', cn:'孩子想要的玩具。' }
    ]
  },
  {
    pattern: '〜こと',
    level: 'N4',
    short: '把動詞名詞化',
    explain: '辭書形／ない形＋こと。將動詞變成名詞，常與「が好き／できる／趣味」等搭配。「〜の」也是名詞化，但「こと」更抽象、書面。',
    examples: [
      { jp:'歌うことが好きです。', kana:'うたうことがすきです。', romaji:'Utau koto ga suki desu.', cn:'喜歡唱歌。' }
    ]
  },
  {
    pattern: '〜ことがある',
    level: 'N4',
    short: '曾經〜過',
    explain: 'た形＋ことがある。表示過去經驗。否定：〜ことがない＝沒〜過。',
    examples: [
      { jp:'富士山に登ったことがありますか。', kana:'ふじさんにのぼったことがありますか。', romaji:'Fuji-san ni nobotta koto ga arimasu ka.', cn:'登過富士山嗎？' }
    ]
  },
  {
    pattern: '〜ことにする',
    level: 'N4',
    short: '決定〜（個人決定）',
    explain: '辭書形／ない形＋ことにする。表示說話者自己的決定。',
    examples: [
      { jp:'明日から早く起きることにしました。', kana:'あしたからはやくおきることにしました。', romaji:'Ashita kara hayaku okiru koto ni shimashita.', cn:'我決定明天開始早起。' }
    ]
  },
  {
    pattern: '〜ことになる',
    level: 'N4',
    short: '（事情）決定為〜',
    explain: '辭書形／ない形＋ことになる。常表示非個人意願決定的安排（公司／組織）。',
    examples: [
      { jp:'来月から大阪へ転勤することになりました。', kana:'らいげつからおおさかへてんきんすることになりました。', romaji:'Raigetsu kara Oosaka e tenkin suru koto ni narimashita.', cn:'（公司決定）下個月起調職到大阪。' }
    ]
  },
  {
    pattern: '〜かどうか',
    level: 'N4',
    short: '是否〜',
    explain: '普通形＋かどうか（な形／名詞去掉だ）。間接疑問句。',
    examples: [
      { jp:'彼が来るかどうか分かりません。', kana:'かれがくるかどうかわかりません。', romaji:'Kare ga kuru ka dou ka wakarimasen.', cn:'不知道他會不會來。' }
    ]
  },
  {
    pattern: '疑問詞＋か',
    level: 'N4',
    short: '間接疑問',
    explain: '疑問詞（誰、何、どこ等）＋か＋分かる／知る／聞く。',
    examples: [
      { jp:'誰が来るか知っていますか。', kana:'だれがくるかしっていますか。', romaji:'Dare ga kuru ka shitteimasu ka.', cn:'知道誰會來嗎？' }
    ]
  },
  {
    pattern: '〜と言う / 〜と思う',
    level: 'N4',
    short: '說〜／認為〜（引用）',
    explain: '普通形＋と言う／と思う／と書いてある。「と」是引用助詞。',
    examples: [
      { jp:'明日は雨だと思います。', kana:'あしたはあめだとおもいます。', romaji:'Ashita wa ame da to omoimasu.', cn:'我認為明天會下雨。' }
    ]
  },
  {
    pattern: '〜と言われている',
    level: 'N4',
    short: '據說〜',
    explain: '普通形＋と言われている。表示一般的傳聞、社會共識。',
    examples: [
      { jp:'富士山は日本一高い山だと言われています。', kana:'ふじさんはにほんいちたかいやまだといわれています。', romaji:'Fuji-san wa Nihon ichi takai yama da to iwareteimasu.', cn:'據說富士山是日本最高的山。' }
    ]
  },
  {
    pattern: 'てあげる / てもらう / てくれる',
    level: 'N4',
    short: '授受表現（為某人做）',
    explain: 'て形＋あげる（我幫人）／もらう（請人為我做）／くれる（人為我做）。授受方向是 N4 重點。',
    examples: [
      { jp:'友達にケーキを作ってあげました。', kana:'ともだちにけーきをつくってあげました。', romaji:'Tomodachi ni keeki wo tsukutte agemashita.', cn:'幫朋友做了蛋糕。' },
      { jp:'先生に直してもらいました。', kana:'せんせいになおしてもらいました。', romaji:'Sensei ni naoshite moraimashita.', cn:'請老師幫我訂正。' },
      { jp:'母がお弁当を作ってくれました。', kana:'ははがおべんとうをつくってくれました。', romaji:'Haha ga obentou wo tsukutte kuremashita.', cn:'媽媽幫我做了便當。' }
    ]
  },
  {
    pattern: 'てある',
    level: 'N4',
    short: '〜著（狀態，有意圖）',
    explain: '他動詞て形＋ある。表示有人為了某目的所做的結果狀態。對比：自動詞ている＝單純狀態。',
    examples: [
      { jp:'壁に絵が掛けてあります。', kana:'かべにえがかけてあります。', romaji:'Kabe ni e ga kakete arimasu.', cn:'牆上掛著畫（有人掛上去的）。' }
    ]
  },
  {
    pattern: 'ておく',
    level: 'N4',
    short: '事先做〜／放著〜',
    explain: 'て形＋おく。表示為將來做準備，或維持某狀態。口語縮成「〜とく」。',
    examples: [
      { jp:'明日のためにお弁当を作っておきます。', kana:'あしたのためにおべんとうをつくっておきます。', romaji:'Ashita no tame ni obentou wo tsukutte okimasu.', cn:'為了明天先做好便當。' }
    ]
  },
  {
    pattern: 'てしまう',
    level: 'N4',
    short: '〜完了／不小心〜了',
    explain: 'て形＋しまう。① 完成、結束 ② 不小心做了（後悔、遺憾）。口語縮成「〜ちゃう／じゃう」。',
    examples: [
      { jp:'宿題はもう終わってしまいました。', kana:'しゅくだいはもうおわってしまいました。', romaji:'Shukudai wa mou owatte shimaimashita.', cn:'作業已經完成了。' },
      { jp:'財布を落としてしまった。', kana:'さいふをおとしてしまった。', romaji:'Saifu wo otoshite shimatta.', cn:'不小心把錢包弄丟了。' }
    ]
  },
  {
    pattern: 'てみる',
    level: 'N4',
    short: '試試看〜',
    explain: 'て形＋みる。表示嘗試做某事。',
    examples: [
      { jp:'この服を着てみてもいいですか。', kana:'このふくをきてみてもいいですか。', romaji:'Kono fuku wo kite mite mo ii desu ka.', cn:'可以試穿這件衣服嗎？' }
    ]
  },
  {
    pattern: 'ていく / てくる',
    level: 'N4',
    short: '〜下去／〜過來（變化／移動方向）',
    explain: 'て形＋いく（離開／持續進行）／くる（朝向我來／持續到現在）。表示變化方向或移動方向。',
    examples: [
      { jp:'これからも頑張っていきます。', kana:'これからもがんばっていきます。', romaji:'Korekara mo ganbatte ikimasu.', cn:'今後也會繼續努力下去。' },
      { jp:'雨が降ってきた。', kana:'あめがふってきた。', romaji:'Ame ga futte kita.', cn:'下起雨來了。' }
    ]
  },
  {
    pattern: '〜まま',
    level: 'N4',
    show: '保持〜的狀態',
    short: '保持〜的狀態',
    explain: 'た形／ない形／い形／な形＋な／名詞＋の＋まま。表示某狀態維持不變。',
    examples: [
      { jp:'靴を履いたまま入らないでください。', kana:'くつをはいたまままはいらないでください。', romaji:'Kutsu wo haita mama hairanaide kudasai.', cn:'請不要穿著鞋進來。' }
    ]
  },
  {
    pattern: '〜ばかり',
    level: 'N4',
    short: '盡是〜、淨是〜',
    explain: '名詞／辭書形／て形＋ばかり。表示「老是」「淨是」，常帶有負面語感。',
    examples: [
      { jp:'弟はゲームばかりしている。', kana:'おとうとはげーむばかりしている。', romaji:'Otouto wa geemu bakari shiteiru.', cn:'弟弟一天到晚就只玩遊戲。' }
    ]
  },
  {
    pattern: '〜のは / 〜のが',
    level: 'N4',
    short: '名詞化指代',
    explain: '辭書形＋の＝把動詞句變成名詞。「のは」標示主題、「のが」標示主語。',
    examples: [
      { jp:'歌を歌うのが好きです。', kana:'うたをうたうのがすきです。', romaji:'Uta wo utau no ga suki desu.', cn:'喜歡唱歌。' },
      { jp:'勉強するのは難しい。', kana:'べんきょうするのはむずかしい。', romaji:'Benkyou suru no wa muzukashii.', cn:'學習這件事很難。' }
    ]
  },
  {
    pattern: 'お／ご〜になる',
    level: 'N4',
    short: '尊敬表現',
    explain: 'お＋ます形（和語）／ご＋名詞（漢語）＋になる。表達對對方動作的尊敬。',
    examples: [
      { jp:'先生がお話しになりました。', kana:'せんせいがおはなしになりました。', romaji:'Sensei ga ohanashi ni narimashita.', cn:'老師說了。' }
    ]
  },
  {
    pattern: 'お／ご〜する',
    level: 'N4',
    short: '謙讓表現',
    explain: 'お＋ます形（和語）／ご＋名詞（漢語）＋する。降低自己的動作以抬高對方。',
    examples: [
      { jp:'お荷物をお持ちします。', kana:'おにもつをおもちします。', romaji:'Onimotsu wo omochi shimasu.', cn:'我來幫您拿行李。' }
    ]
  },
  {
    pattern: '特殊敬語動詞',
    level: 'N4',
    short: 'いらっしゃる、おっしゃる、なさる…',
    explain: 'N4 必背：行く／来る／いる→いらっしゃる、見る→ご覧になる、する→なさる、食べる→召し上がる、言う→おっしゃる、知る→ご存じだ。',
    examples: [
      { jp:'先生は何時にいらっしゃいますか。', kana:'せんせいはなんじにいらっしゃいますか。', romaji:'Sensei wa nanji ni irasshaimasu ka.', cn:'老師幾點來？' }
    ]
  },
  {
    pattern: '特殊謙讓動詞',
    level: 'N4',
    short: '伺う、申す、いたす、参る…',
    explain: 'N4 必背：行く／来る→参る・伺う、見る→拝見する、する→いたす、食べる／飲む／もらう→いただく、言う→申す、聞く／訪問する→伺う。',
    examples: [
      { jp:'私は田中と申します。', kana:'わたしはたなかともうします。', romaji:'Watashi wa Tanaka to moushimasu.', cn:'我叫田中。' }
    ]
  },
  {
    pattern: '〜について',
    level: 'N4',
    short: '關於〜',
    explain: '名詞＋について。後接話題範圍動詞（話す／書く／調べる等）。',
    examples: [
      { jp:'日本の文化について研究しています。', kana:'にほんのぶんかについてけんきゅうしています。', romaji:'Nihon no bunka ni tsuite kenkyuu shiteimasu.', cn:'正在研究關於日本文化。' }
    ]
  },
  {
    pattern: '〜によって / 〜による',
    level: 'N4',
    short: '依〜／因〜（手段／原因）',
    explain: '名詞＋によって。表示根據、手段或原因。「〜による＋名詞」修飾後面的名詞。',
    examples: [
      { jp:'国によって習慣が違います。', kana:'くににによってしゅうかんがちがいます。', romaji:'Kuni ni yotte shuukan ga chigaimasu.', cn:'依國家不同習慣也不同。' }
    ]
  },
  {
    pattern: '〜のに使う',
    level: 'N4',
    short: '用來做〜',
    explain: '辭書形＋のに使う／必要だ。後項動詞需要前項用途的目的句型。',
    examples: [
      { jp:'このハサミは紙を切るのに使います。', kana:'このはさみはかみをきるのにつかいます。', romaji:'Kono hasami wa kami wo kiru no ni tsukaimasu.', cn:'這把剪刀是用來剪紙的。' }
    ]
  },
  {
    pattern: '〜ても構わない',
    level: 'N4',
    short: '〜也沒關係',
    explain: 'て形＋も構わない。比「〜てもいい」更隨意，常譯成「無所謂、隨便」。',
    examples: [
      { jp:'タバコを吸っても構いません。', kana:'たばこをすってもかまいません。', romaji:'Tabako wo sutte mo kamaimasen.', cn:'抽菸也無妨。' }
    ]
  },
  {
    pattern: '〜なくちゃいけない',
    level: 'N4',
    short: '必須〜（口語）',
    explain: '「〜なくてはいけない」的縮約口語形。同義有「〜なきゃ／〜なきゃいけない」。',
    examples: [
      { jp:'明日早く起きなくちゃいけない。', kana:'あしたはやくおきなくちゃいけない。', romaji:'Ashita hayaku okinakucha ikenai.', cn:'明天得早起。' }
    ]
  },
  {
    pattern: '〜のだ / 〜んです',
    level: 'N4',
    short: '說明、強調原因',
    explain: '普通形＋のだ／んです。提供說明、表達原因、或請求對方理解。口語「〜んです」很常用。',
    examples: [
      { jp:'どうしたんですか。', kana:'どうしたんですか。', romaji:'Doushita n desu ka.', cn:'怎麼了嗎？' },
      { jp:'お腹が痛いんです。', kana:'おなかがいたいんです。', romaji:'Onaka ga itai n desu.', cn:'肚子痛（向你說明）。' }
    ]
  },
  {
    pattern: '〜じゃないか / 〜よね',
    level: 'N4',
    short: '確認、徵求同意',
    explain: '常體＋じゃない（か）／よね。對對方確認某事、徵求同意。',
    examples: [
      { jp:'明日休みだよね？', kana:'あしたやすみだよね？', romaji:'Ashita yasumi da yo ne?', cn:'明天放假對吧？' }
    ]
  },
  {
    pattern: '〜ば〜ほど',
    level: 'N4',
    short: '越〜越〜',
    explain: '動詞ば形＋辭書形＋ほど；い形容詞ければ＋い；な形なら＋な。表示程度成正比。',
    examples: [
      { jp:'読めば読むほど面白い。', kana:'よめばよむほどおもしろい。', romaji:'Yomeba yomu hodo omoshiroi.', cn:'越讀越有趣。' }
    ]
  },

  // ================================================
  // ====              N3 文法 (~100 條)           ====
  // ================================================

  {
    pattern: '〜うちに',
    level: 'N3',
    short: '趁〜的時候；不知不覺地',
    explain: '辭書形／ない形／い形／な形＋な／名詞の＋うちに。① 趁某狀態還在時做某事 ② 接ている形時表示「不知不覺地」。',
    examples: [
      { jp:'若いうちに勉強しなさい。', kana:'わかいうちにべんきょうしなさい。', romaji:'Wakai uchi ni benkyou shinasai.', cn:'趁年輕好好讀書。' },
      { jp:'話しているうちに眠くなった。', kana:'はなしているうちにねむくなった。', romaji:'Hanashite iru uchi ni nemuku natta.', cn:'說著說著就睏了。' }
    ]
  },
  {
    pattern: '〜たびに',
    level: 'N3',
    short: '每次〜的時候',
    explain: '辭書形／名詞の＋たびに。表示每當某事發生，就會有後續結果。',
    examples: [
      { jp:'この曲を聞くたびに昔を思い出す。', kana:'このきょくをきくたびにむかしをおもいだす。', romaji:'Kono kyoku wo kiku tabi ni mukashi wo omoidasu.', cn:'每次聽到這首歌就想起以前。' }
    ]
  },
  {
    pattern: '〜際（に）',
    level: 'N3',
    short: '〜的時候（正式）',
    explain: '辭書形／た形／名詞の＋際（に）。「とき」的書面正式版，常見於公告、注意事項。',
    examples: [
      { jp:'お降りの際は足元にご注意ください。', kana:'おおりのさいはあしもとにごちゅういください。', romaji:'Oori no sai wa ashimoto ni gochuui kudasai.', cn:'下車時請注意腳下。' }
    ]
  },
  {
    pattern: '〜つつ / 〜つつある',
    level: 'N3',
    short: '一邊〜；正在〜（書面）',
    explain: 'ます形（去ます）＋つつ。書面語版的「〜ながら」。「〜つつある」表示變化正在進行中。',
    examples: [
      { jp:'コーヒーを飲みつつ新聞を読む。', kana:'こーひーをのみつつしんぶんをよむ。', romaji:'Koohii wo nomi tsutsu shinbun wo yomu.', cn:'一邊喝咖啡一邊看報。' },
      { jp:'環境問題は深刻になりつつある。', kana:'かんきょうもんだいはしんこくになりつつある。', romaji:'Kankyou mondai wa shinkoku ni nari tsutsu aru.', cn:'環境問題正在加劇。' }
    ]
  },
  {
    pattern: '〜ながら（逆接）',
    level: 'N3',
    short: '雖然〜卻〜',
    explain: 'ます形（去ます）／い形／な形＋ながら。除了「同時進行」之外，N3 加上「雖然…卻…」的逆接用法。',
    examples: [
      { jp:'知っていながら教えてくれない。', kana:'しっていながらおしえてくれない。', romaji:'Shitteinagara oshiete kurenai.', cn:'明明知道卻不告訴我。' }
    ]
  },
  {
    pattern: '〜ものの',
    level: 'N3',
    short: '雖然〜但是',
    explain: '普通形＋ものの（な形＋な、名詞＋である）。表示已實現的事實後接出乎意料的結果，比「〜のに」更書面。',
    examples: [
      { jp:'大学を卒業したものの、就職先が見つからない。', kana:'だいがくをそつぎょうしたものの、しゅうしょくさきがみつからない。', romaji:'Daigaku wo sotsugyou shita mono no, shuushokusaki ga mitsukaranai.', cn:'雖然大學畢業了，卻找不到工作。' }
    ]
  },
  {
    pattern: '〜にもかかわらず',
    level: 'N3',
    short: '儘管〜還是〜',
    explain: '普通形／名詞＋にもかかわらず。表示強烈逆接，「即使在這個狀況下，仍然…」。',
    examples: [
      { jp:'雨にもかかわらず、試合は行われた。', kana:'あめにもかかわらず、しあいはおこなわれた。', romaji:'Ame ni mo kakawarazu, shiai wa okonawareta.', cn:'儘管下雨，比賽仍然舉行了。' }
    ]
  },
  {
    pattern: '〜くせに',
    level: 'N3',
    short: '明明〜卻〜（帶責備）',
    explain: '普通形＋くせに（な形＋な、名詞＋の）。比「〜のに」更口語、更帶有責備或不滿。',
    examples: [
      { jp:'知らないくせに偉そうに言うな。', kana:'しらないくせにえらそうにいうな。', romaji:'Shiranai kuse ni erasou ni iu na.', cn:'明明不知道，少擺出一副了不起的樣子。' }
    ]
  },
  {
    pattern: '〜にしたがって',
    level: 'N3',
    short: '隨著〜',
    explain: '辭書形／名詞＋にしたがって。前項變化引起後項變化，正面或漸進性。',
    examples: [
      { jp:'年をとるにしたがって体力が落ちる。', kana:'としをとるにしたがってたいりょくがおちる。', romaji:'Toshi wo toru ni shitagatte tairyoku ga ochiru.', cn:'隨著年齡增長體力下降。' }
    ]
  },
  {
    pattern: '〜につれて',
    level: 'N3',
    short: '隨著〜',
    explain: '辭書形／名詞＋につれて。與「にしたがって」近似，更常見於自然漸進的變化。',
    examples: [
      { jp:'時間が経つにつれて記憶が薄れる。', kana:'じかんがたつにつれてきおくがうすれる。', romaji:'Jikan ga tatsu ni tsurete kioku ga usureru.', cn:'隨著時間流逝，記憶逐漸淡去。' }
    ]
  },
  {
    pattern: '〜にともなって',
    level: 'N3',
    short: '伴隨〜',
    explain: '辭書形／名詞＋にともなって。表示一事發生時，另一事同時發生。',
    examples: [
      { jp:'人口の増加にともなって食料の需要も増えた。', kana:'じんこうのぞうかにともなってしょくりょうのじゅようもふえた。', romaji:'Jinkou no zouka ni tomonatte shokuryou no juyou mo fueta.', cn:'伴隨人口增加，糧食需求也增加了。' }
    ]
  },
  {
    pattern: '〜とともに',
    level: 'N3',
    short: '與〜一起、隨著〜',
    explain: '名詞／辭書形＋とともに。① 共同行動 ② 同時變化／發生。',
    examples: [
      { jp:'家族とともに過ごす時間が大切だ。', kana:'かぞくとともにすごすじかんがたいせつだ。', romaji:'Kazoku to tomo ni sugosu jikan ga taisetsu da.', cn:'與家人共度的時光很重要。' }
    ]
  },
  {
    pattern: '〜あげく',
    level: 'N3',
    short: '〜結果（多為負面）',
    explain: 'た形／名詞の＋あげく。表示長時間努力或苦惱後得到不好的結果。',
    examples: [
      { jp:'さんざん悩んだあげく、辞めることにした。', kana:'さんざんなやんだあげく、やめることにした。', romaji:'Sanzan nayanda ageku, yameru koto ni shita.', cn:'煩惱了好久，最後決定辭職。' }
    ]
  },
  {
    pattern: '〜末（に）',
    level: 'N3',
    short: '經過〜結果',
    explain: 'た形／名詞の＋末（に）。表示經過長時間考慮、努力後的結果。',
    examples: [
      { jp:'よく考えた末に決めました。', kana:'よくかんがえたすえにきめました。', romaji:'Yoku kangaeta sue ni kimemashita.', cn:'仔細考慮後決定的。' }
    ]
  },
  {
    pattern: '〜きり',
    level: 'N3',
    short: '〜之後就（再也沒）',
    explain: 'た形＋きり。表示某動作之後就一直保持那狀態，常帶後悔或意外。',
    examples: [
      { jp:'10年前に会ったきり、彼とは連絡していない。', kana:'10ねんまえにあったきり、かれとはれんらくしていない。', romaji:'Juu-nen mae ni atta kiri, kare to wa renraku shite inai.', cn:'10 年前見過之後就沒再聯絡了。' }
    ]
  },
  {
    pattern: '〜きる / 〜きれない',
    level: 'N3',
    short: '完全〜／無法〜完',
    explain: 'ます形（去ます）＋きる＝完全做完／到極限；きれない＝無法做完。',
    examples: [
      { jp:'42キロを走りきった。', kana:'42きろをはしりきった。', romaji:'42-kiro wo hashiri kitta.', cn:'跑完了 42 公里。' },
      { jp:'この量は食べきれない。', kana:'このりょうはたべきれない。', romaji:'Kono ryou wa tabe kirenai.', cn:'這份量我吃不完。' }
    ]
  },
  {
    pattern: '〜ぬく',
    level: 'N3',
    short: '徹底〜、撐到最後',
    explain: 'ます形（去ます）＋ぬく。表示克服困難堅持到最後。',
    examples: [
      { jp:'最後まで走りぬきました。', kana:'さいごまではしりぬきました。', romaji:'Saigo made hashiri nukimashita.', cn:'堅持跑到了最後。' }
    ]
  },
  {
    pattern: '〜っぱなし',
    level: 'N3',
    short: '一直〜著（不收拾）',
    explain: 'ます形（去ます）＋っぱなし。① 開著／放著沒收拾 ② 持續做某動作。',
    examples: [
      { jp:'電気をつけっぱなしで寝た。', kana:'でんきをつけっぱなしでねた。', romaji:'Denki wo tsukeppanashi de neta.', cn:'開著燈就睡了。' }
    ]
  },
  {
    pattern: '〜だらけ',
    level: 'N3',
    short: '滿是〜（負面）',
    explain: '名詞＋だらけ。表示充滿（不希望的）東西。',
    examples: [
      { jp:'机の上はほこりだらけだ。', kana:'つくえのうえはほこりだらけだ。', romaji:'Tsukue no ue wa hokori darake da.', cn:'桌上滿是灰塵。' }
    ]
  },
  {
    pattern: '〜気味',
    level: 'N3',
    short:'有點〜（傾向）',
    explain: 'ます形（去ます）／名詞＋気味。表示稍微有某種傾向，常見負面。',
    examples: [
      { jp:'最近、太り気味だ。', kana:'さいきん、ふとりぎみだ。', romaji:'Saikin, futori gimi da.', cn:'最近有點變胖。' }
    ]
  },
  {
    pattern: '〜げ',
    level: 'N3',
    short: '看起來〜的樣子',
    explain: 'い形容詞去い／な形原形＋げ。形成新的な形容詞，表示「看起來」。',
    examples: [
      { jp:'寂しげな顔をしている。', kana:'さびしげなかおをしている。', romaji:'Sabishige na kao wo shite iru.', cn:'露出寂寞的表情。' }
    ]
  },
  {
    pattern: '〜っぽい',
    level: 'N3',
    short: '帶有〜的感覺',
    explain: '名詞／ます形（去ます）／い形容詞（去い）＋っぽい。表示帶有某種傾向。',
    examples: [
      { jp:'彼は子供っぽい。', kana:'かれはこどもっぽい。', romaji:'Kare wa kodomoppoi.', cn:'他孩子氣。' },
      { jp:'忘れっぽい性格。', kana:'わすれっぽいせいかく。', romaji:'Wasureppoi seikaku.', cn:'健忘的個性。' }
    ]
  },
  {
    pattern: '〜がち',
    level: 'N3',
    short: '容易、常常〜',
    explain: 'ます形（去ます）／名詞＋がち。表示傾向，多為負面。',
    examples: [
      { jp:'冬は風邪を引きがちだ。', kana:'ふゆはかぜをひきがちだ。', romaji:'Fuyu wa kaze wo hiki gachi da.', cn:'冬天容易感冒。' }
    ]
  },
  {
    pattern: '〜次第',
    level: 'N3',
    short: '一〜就馬上、視〜而定',
    explain: '① ます形＋次第＝一…就…（用於正式場合）。② 名詞＋次第（で）＝取決於…。',
    examples: [
      { jp:'分かり次第ご連絡します。', kana:'わかりしだいごれんらくします。', romaji:'Wakari shidai gorenraku shimasu.', cn:'一知道就會聯絡您。' },
      { jp:'結果は努力次第だ。', kana:'けっかはどりょくしだいだ。', romaji:'Kekka wa doryoku shidai da.', cn:'結果取決於努力。' }
    ]
  },
  {
    pattern: '〜とおりに / 〜どおりに',
    level: 'N3',
    short: '按照〜',
    explain: '辭書形／た形／名詞の＋とおりに；名詞＋どおりに。表示完全按照前項。',
    examples: [
      { jp:'説明書のとおりに組み立ててください。', kana:'せつめいしょのとおりにくみたててください。', romaji:'Setsumeisho no toori ni kumitatete kudasai.', cn:'請按照說明書組裝。' },
      { jp:'予定どおりに到着した。', kana:'よていどおりにとうちゃくした。', romaji:'Yotei doori ni touchaku shita.', cn:'按照預定到達了。' }
    ]
  },
  {
    pattern: '〜上で',
    level: 'N3',
    short: '在〜方面；〜之後',
    explain: '① 名詞の／辭書形＋上で＝在某方面、為了某目的 ② た形＋上で＝〜之後再〜。',
    examples: [
      { jp:'よく考えた上で決めます。', kana:'よくかんがえたうえできめます。', romaji:'Yoku kangaeta ue de kimemasu.', cn:'仔細考慮過後再決定。' }
    ]
  },
  {
    pattern: '〜上は / 〜以上は',
    level: 'N3',
    short: '既然〜',
    explain: '辭書形／た形＋上は／以上は。表示既然如此就應該〜，常接決心或義務。',
    examples: [
      { jp:'約束した以上は守らなければならない。', kana:'やくそくしたいじょうはまもらなければならない。', romaji:'Yakusoku shita ijou wa mamoranakereba naranai.', cn:'既然答應了就必須遵守。' }
    ]
  },
  {
    pattern: '〜どころか',
    level: 'N3',
    short: '別說〜，反而〜',
    explain: '名詞／普通形＋どころか。前後對比，強調事實與預期相反。',
    examples: [
      { jp:'貯金どころか借金まである。', kana:'ちょきんどころかしゃっきんまである。', romaji:'Chokin dokoro ka shakkin made aru.', cn:'別說存款了，連欠款都有。' }
    ]
  },
  {
    pattern: '〜どころではない',
    level: 'N3',
    short: '哪有空〜、現在不是〜的時候',
    explain: '辭書形／名詞＋どころではない。表示在現況下完全沒辦法做某事。',
    examples: [
      { jp:'忙しくて遊ぶどころではない。', kana:'いそがしくてあそぶどころではない。', romaji:'Isogashikute asobu dokoro de wa nai.', cn:'忙得沒空玩。' }
    ]
  },
  {
    pattern: '〜ものだ',
    level: 'N3',
    short: '本來就〜、應該〜',
    explain: '普通形＋ものだ。① 表示一般常識、本性 ② 表示感慨。否定「〜ものではない」帶有訓誡。',
    examples: [
      { jp:'子供は元気なものだ。', kana:'こどもはげんきなものだ。', romaji:'Kodomo wa genki na mono da.', cn:'小孩本來就充滿活力。' },
      { jp:'人の悪口を言うものではない。', kana:'ひとのわるくちをいうものではない。', romaji:'Hito no waruguchi wo iu mono de wa nai.', cn:'不應該說人壞話。' }
    ]
  },
  {
    pattern: '〜ものか',
    level: 'N3',
    short: '才不要〜、怎麼可能〜',
    explain: '普通形＋ものか。強烈否定的反問。',
    examples: [
      { jp:'あんな店、二度と行くものか。', kana:'あんなみせ、にどといくものか。', romaji:'Anna mise, nido to iku mono ka.', cn:'那種店我才不會再去。' }
    ]
  },
  {
    pattern: '〜ものなら',
    level: 'N3',
    short: '如果能〜的話',
    explain: '可能形＋ものなら。表示假設可能但實際難以實現。',
    examples: [
      { jp:'できるものなら、もう一度大学に戻りたい。', kana:'できるものなら、もういちどだいがくにもどりたい。', romaji:'Dekiru mono nara, mou ichido daigaku ni modoritai.', cn:'如果可以的話想再回大學一次。' }
    ]
  },
  {
    pattern: '〜ことに（は）',
    level: 'N3',
    short: '令人〜的是',
    explain: '感情形容詞た形／い形／な形＋ことに（は）。在句首強調說話者的感情。',
    examples: [
      { jp:'驚いたことに、彼は私の名前を覚えていた。', kana:'おどろいたことに、かれはわたしのなまえをおぼえていた。', romaji:'Odoroita koto ni, kare wa watashi no namae wo oboete ita.', cn:'令人驚訝的是，他記得我的名字。' }
    ]
  },
  {
    pattern: '〜ことから',
    level: 'N3',
    short: '從〜可知、因為〜',
    explain: '普通形＋ことから。表示根據前項事實得出結論。',
    examples: [
      { jp:'家が近いことから、彼とよく一緒に遊んだ。', kana:'いえがちかいことから、かれとよくいっしょにあそんだ。', romaji:'Ie ga chikai koto kara, kare to yoku issho ni asonda.', cn:'因為家近，常和他一起玩。' }
    ]
  },
  {
    pattern: '〜ことなく',
    level: 'N3',
    short: '沒有〜地（書面）',
    explain: '辭書形＋ことなく。「〜ないで」的書面語版本。',
    examples: [
      { jp:'休むことなく働き続けた。', kana:'やすむことなくはたらきつづけた。', romaji:'Yasumu koto naku hataraki tsuzuketa.', cn:'沒休息地一直工作。' }
    ]
  },
  {
    pattern: '〜ことだから',
    level: 'N3',
    short: '因為是〜（個性／習慣的推測）',
    explain: '名詞の＋ことだから。根據對某人個性／習慣的了解做出推測。',
    examples: [
      { jp:'彼のことだから、また遅刻するだろう。', kana:'かれのことだから、またちこくするだろう。', romaji:'Kare no koto da kara, mata chikoku suru darou.', cn:'依他的個性看，又會遲到吧。' }
    ]
  },
  {
    pattern: '〜ことになっている',
    level: 'N3',
    short: '規定／預定〜',
    explain: '辭書形／ない形＋ことになっている。表示規定、預定、習慣（非個人決定）。',
    examples: [
      { jp:'校内では禁煙ということになっている。', kana:'こうないではきんえんということになっている。', romaji:'Kounai de wa kinen to iu koto ni natte iru.', cn:'校內規定禁菸。' }
    ]
  },
  {
    pattern: '〜にすぎない',
    level: 'N3',
    short: '只不過是〜',
    explain: '名詞／辭書形＋にすぎない。表示「不過如此、僅此而已」，帶輕視語感。',
    examples: [
      { jp:'これは噂にすぎない。', kana:'これはうわさにすぎない。', romaji:'Kore wa uwasa ni suginai.', cn:'這只不過是傳聞。' }
    ]
  },
  {
    pattern: '〜にちがいない',
    level: 'N3',
    short: '一定是〜（強烈推斷）',
    explain: '普通形＋にちがいない。表示說話者強烈確信。比「はず」更主觀。',
    examples: [
      { jp:'彼は来ないにちがいない。', kana:'かれはこないにちがいない。', romaji:'Kare wa konai ni chigai nai.', cn:'他一定不會來。' }
    ]
  },
  {
    pattern: '〜にきまっている',
    level: 'N3',
    short: '肯定是〜（口語斷定）',
    explain: '普通形＋にきまっている。表示說話者百分百肯定，口語常用。',
    examples: [
      { jp:'今日も負けるにきまっている。', kana:'きょうもまけるにきまっている。', romaji:'Kyou mo makeru ni kimatte iru.', cn:'今天肯定也會輸。' }
    ]
  },
  {
    pattern: '〜ということだ',
    level: 'N3',
    short: '據說〜、也就是說',
    explain: '普通形＋ということだ。① 傳聞 ② 解釋、總結。',
    examples: [
      { jp:'天気予報によると、明日は雨ということだ。', kana:'てんきよほうによると、あしたはあめということだ。', romaji:'Tenki yohou ni yoru to, ashita wa ame to iu koto da.', cn:'氣象預報說明天會下雨。' }
    ]
  },
  {
    pattern: '〜というのは',
    level: 'N3',
    short: '所謂的〜是',
    explain: '名詞／普通形＋というのは。用於解釋一個名詞或概念。',
    examples: [
      { jp:'JLPTというのは日本語能力試験のことだ。', kana:'JLPTというのはにほんごのうりょくしけんのことだ。', romaji:'JLPT to iu no wa Nihongo Nouryoku Shiken no koto da.', cn:'所謂的 JLPT 就是日本語能力試驗。' }
    ]
  },
  {
    pattern: '〜にしては',
    level: 'N3',
    short: '以〜來說',
    explain: '普通形（の去掉）／名詞＋にしては。表示「以某標準來看，結果出乎意料」。',
    examples: [
      { jp:'初心者にしては上手だ。', kana:'しょしんしゃにしてはじょうずだ。', romaji:'Shoshinsha ni shite wa jouzu da.', cn:'以初學者來說很厲害。' }
    ]
  },
  {
    pattern: '〜にしても',
    level: 'N3',
    short: '即使〜也〜',
    explain: '普通形／名詞＋にしても。表示讓步「即使如此」。',
    examples: [
      { jp:'忙しいにしても電話くらいできるはずだ。', kana:'いそがしいにしてもでんわくらいできるはずだ。', romaji:'Isogashii ni shite mo denwa kurai dekiru hazu da.', cn:'就算忙也應該能打通電話吧。' }
    ]
  },
  {
    pattern: '〜にしろ / 〜にせよ',
    level: 'N3',
    short: '不管〜還是〜',
    explain: '普通形／名詞＋にしろ／にせよ。並列、不論哪一種情況都〜。',
    examples: [
      { jp:'行くにしろ行かないにしろ、早く決めてください。', kana:'いくにしろいかないにしろ、はやくきめてください。', romaji:'Iku ni shiro ikanai ni shiro, hayaku kimete kudasai.', cn:'不管去不去，請快點決定。' }
    ]
  },
  {
    pattern: '〜とは限らない',
    level: 'N3',
    short: '不一定〜',
    explain: '普通形＋とは限らない。表示「未必如此」，否定一般觀念。',
    examples: [
      { jp:'金持ちが幸せだとは限らない。', kana:'かねもちがしあわせだとはかぎらない。', romaji:'Kanemochi ga shiawase da to wa kagiranai.', cn:'有錢人不一定幸福。' }
    ]
  },
  {
    pattern: '〜ようがない',
    level: 'N3',
    short: '無法〜',
    explain: 'ます形（去ます）＋ようがない。表示根本沒有方法做某事。',
    examples: [
      { jp:'連絡先を知らないので、連絡しようがない。', kana:'れんらくさきをしらないので、れんらくしようがない。', romaji:'Renrakusaki wo shiranai node, renraku shiyou ga nai.', cn:'不知道聯絡方式，無法聯絡。' }
    ]
  },
  {
    pattern: '〜ばかりに',
    level: 'N3',
    short: '就因為〜（後悔）',
    explain: '普通形＋ばかりに。表示因為前項才導致不好的後果。',
    examples: [
      { jp:'寝坊したばかりに、電車に乗り遅れた。', kana:'ねぼうしたばかりに、でんしゃにのりおくれた。', romaji:'Nebou shita bakari ni, densha ni noriokureta.', cn:'就因為睡過頭，錯過了電車。' }
    ]
  },
  {
    pattern: '〜ばかりでなく / 〜のみならず',
    level: 'N3',
    short: '不僅〜還〜',
    explain: '普通形／名詞＋ばかりでなく（口語）／のみならず（書面）。表示遞進。',
    examples: [
      { jp:'彼は英語ばかりでなく、フランス語も話せる。', kana:'かれはえいごばかりでなく、ふらんすごもはなせる。', romaji:'Kare wa eigo bakari de naku, furansugo mo hanaseru.', cn:'他不僅會英語，也會法語。' }
    ]
  },
  {
    pattern: '〜さえ',
    level: 'N3',
    short: '連〜都',
    explain: '名詞／て形＋さえ。表示舉出極端例子。「〜さえ〜ば」＝只要…就…。',
    examples: [
      { jp:'子供さえ知っている。', kana:'こどもさえしっている。', romaji:'Kodomo sae shitte iru.', cn:'連小孩都知道。' },
      { jp:'お金さえあれば幸せだ。', kana:'おかねさえあればしあわせだ。', romaji:'Okane sae areba shiawase da.', cn:'只要有錢就幸福。' }
    ]
  },
  {
    pattern: '〜こそ',
    level: 'N3',
    short: '正是〜、才是〜',
    explain: '名詞／普通形＋こそ。強調某事物的重要性或特定性。',
    examples: [
      { jp:'今度こそ合格したい。', kana:'こんどこそごうかくしたい。', romaji:'Kondo koso goukaku shitai.', cn:'這次一定要考上。' }
    ]
  },
  {
    pattern: '〜にかんして / 〜について',
    level: 'N3',
    short: '關於〜',
    explain: '名詞＋にかんして（正式）／について（普通）。後接話題範圍動詞。',
    examples: [
      { jp:'日本の歴史について研究しています。', kana:'にほんのれきしについてけんきゅうしています。', romaji:'Nihon no rekishi ni tsuite kenkyuu shite imasu.', cn:'正在研究日本歷史。' }
    ]
  },
  {
    pattern: '〜にたいして',
    level: 'N3',
    short: '對於〜',
    explain: '名詞＋にたいして。表示動作或態度的對象。',
    examples: [
      { jp:'目上の人に対しては丁寧な言葉を使う。', kana:'めうえのひとにたいしてはていねいなことばをつかう。', romaji:'Meue no hito ni taishite wa teinei na kotoba wo tsukau.', cn:'對長輩要用禮貌的話。' }
    ]
  },
  {
    pattern: '〜にとって',
    level: 'N3',
    short: '對〜來說',
    explain: '名詞＋にとって。表示從某立場、角度看。',
    examples: [
      { jp:'私にとって日本語は難しい。', kana:'わたしにとってにほんごはむずかしい。', romaji:'Watashi ni totte Nihongo wa muzukashii.', cn:'對我來說日語很難。' }
    ]
  },
  {
    pattern: '〜によって / 〜による',
    level: 'N3',
    short: '依〜、因〜',
    explain: '名詞＋によって。① 依不同情況 ② 根據 ③ 動作主（被動句）。修飾名詞用「〜による」。',
    examples: [
      { jp:'考え方は人によって違う。', kana:'かんがえかたはひとによってちがう。', romaji:'Kangaekata wa hito ni yotte chigau.', cn:'看法因人而異。' },
      { jp:'地震による被害が大きい。', kana:'じしんによるひがいがおおきい。', romaji:'Jishin ni yoru higai ga ookii.', cn:'因地震造成的損失很大。' }
    ]
  },
  {
    pattern: '〜にもとづいて',
    level: 'N3',
    short: '依據〜',
    explain: '名詞＋にもとづいて。表示「以…為基礎」。修飾名詞用「〜にもとづく」。',
    examples: [
      { jp:'事実に基づいて報告してください。', kana:'じじつにもとづいてほうこくしてください。', romaji:'Jijitsu ni motozuite houkoku shite kudasai.', cn:'請依事實報告。' }
    ]
  },
  {
    pattern: '〜をはじめ',
    level: 'N3',
    short: '以〜為首',
    explain: '名詞＋をはじめ。舉出代表性的例子，「除了X，還有…」。',
    examples: [
      { jp:'寿司をはじめ、日本料理が好きだ。', kana:'すしをはじめ、にほんりょうりがすきだ。', romaji:'Sushi wo hajime, Nihon ryouri ga suki da.', cn:'以壽司為首，喜歡日本料理。' }
    ]
  },
  {
    pattern: '〜をめぐって',
    level: 'N3',
    short: '圍繞著〜',
    explain: '名詞＋をめぐって。表示圍繞某話題進行討論／爭論。',
    examples: [
      { jp:'憲法改正をめぐって議論が続いている。', kana:'けんぽうかいせいをめぐってぎろんがつづいている。', romaji:'Kenpou kaisei wo megutte giron ga tsuzuite iru.', cn:'圍繞修憲問題的討論還在繼續。' }
    ]
  },
  {
    pattern: '〜をこめて',
    level: 'N3',
    short: '懷著〜（感情）',
    explain: '名詞＋をこめて。表示懷著某種感情做某事。',
    examples: [
      { jp:'感謝の気持ちをこめてプレゼントを贈った。', kana:'かんしゃのきもちをこめてぷれぜんとをおくった。', romaji:'Kansha no kimochi wo komete purezento wo okutta.', cn:'懷著感謝之情送了禮物。' }
    ]
  },
  {
    pattern: '〜のおかげで',
    level: 'N3',
    short: '多虧〜',
    explain: '名詞の／普通形＋おかげで。表示正面原因。',
    examples: [
      { jp:'先生のおかげで合格できました。', kana:'せんせいのおかげでごうかくできました。', romaji:'Sensei no okage de goukaku dekimashita.', cn:'多虧老師，我考上了。' }
    ]
  },
  {
    pattern: '〜のせいで',
    level: 'N3',
    short: '都怪〜',
    explain: '名詞の／普通形＋せいで。表示負面原因，帶有歸咎語感。',
    examples: [
      { jp:'寝坊のせいで遅刻した。', kana:'ねぼうのせいでちこくした。', romaji:'Nebou no sei de chikoku shita.', cn:'都怪睡過頭遲到了。' }
    ]
  },
  {
    pattern: '〜のかわりに',
    level: 'N3',
    short: '代替〜',
    explain: '名詞の／辭書形＋かわりに。表示替代或交換。',
    examples: [
      { jp:'コーヒーのかわりに紅茶を飲んだ。', kana:'こーひーのかわりにこうちゃをのんだ。', romaji:'Koohii no kawari ni koucha wo nonda.', cn:'喝紅茶代替咖啡。' }
    ]
  },
  {
    pattern: '〜だけあって',
    level: 'N3',
    short: '不愧是〜',
    explain: '普通形／名詞＋だけあって。表示符合該身份／程度的能力或結果。',
    examples: [
      { jp:'長年勉強しただけあって、日本語が上手だ。', kana:'ながねんべんきょうしただけあって、にほんごがじょうずだ。', romaji:'Naganen benkyou shita dake atte, Nihongo ga jouzu da.', cn:'不愧是學了多年，日語很好。' }
    ]
  },
  {
    pattern: '〜だけに',
    level: 'N3',
    short: '正因為〜更〜',
    explain: '普通形／名詞＋だけに。表示因為某理由所以結果更強。',
    examples: [
      { jp:'期待が大きかっただけに、失望も大きい。', kana:'きたいがおおきかっただけに、しつぼうもおおきい。', romaji:'Kitai ga ookikatta dake ni, shitsubou mo ookii.', cn:'正因為期待大，失望也大。' }
    ]
  },
  {
    pattern: '〜たとたん（に）',
    level: 'N3',
    short: '剛〜就〜',
    explain: 'た形＋とたん（に）。表示一個動作完成的瞬間，立刻發生另一事。',
    examples: [
      { jp:'家を出たとたん雨が降り出した。', kana:'いえをでたとたんあめがふりだした。', romaji:'Ie wo deta totan ame ga furidashita.', cn:'剛出門就下起雨來。' }
    ]
  },
  {
    pattern: '〜かと思うと',
    level: 'N3',
    short: '剛以為〜結果〜',
    explain: 'た形＋かと思うと。表示前項剛發生立刻發生意外的後項。',
    examples: [
      { jp:'帰ってきたかと思うと、また出かけた。', kana:'かえってきたかとおもうと、またでかけた。', romaji:'Kaette kita ka to omou to, mata dekaketa.', cn:'剛以為他回來了，結果又出去了。' }
    ]
  },
  {
    pattern: '〜やら〜やら',
    level: 'N3',
    short: '又〜又〜（雜亂列舉）',
    explain: '辭書形／い形容詞／名詞＋やら〜やら。表示混亂列舉，常帶不愉快。',
    examples: [
      { jp:'引っ越しで、片付けやら掃除やらで忙しい。', kana:'ひっこしで、かたづけやらそうじやらでいそがしい。', romaji:'Hikkoshi de, katazuke yara souji yara de isogashii.', cn:'搬家又整理又打掃，忙得不可開交。' }
    ]
  },
  {
    pattern: '〜にしても〜にしても',
    level: 'N3',
    short: '無論〜還是〜',
    explain: '名詞／普通形＋にしても×2。並列兩種情況，都同樣結果。',
    examples: [
      { jp:'肉にしても魚にしても、好きじゃない。', kana:'にくにしてもさかなにしても、すきじゃない。', romaji:'Niku ni shite mo sakana ni shite mo, suki ja nai.', cn:'肉也好魚也好，都不喜歡。' }
    ]
  },
  {
    pattern: '〜という',
    level: 'N3',
    short: '叫做〜、據說〜',
    explain: '名詞＋という＋名詞＝叫做〜的…；普通形＋という＝據說。',
    examples: [
      { jp:'田中さんという人が来ました。', kana:'たなかさんというひとがきました。', romaji:'Tanaka-san to iu hito ga kimashita.', cn:'有位叫田中先生的人來了。' }
    ]
  },
  {
    pattern: '〜くらい / 〜ほど',
    level: 'N3',
    short: '到〜的程度',
    explain: '普通形＋くらい／ほど。表示程度。「ほど」更正式。',
    examples: [
      { jp:'歩けないくらい疲れた。', kana:'あるけないくらいつかれた。', romaji:'Arukenai kurai tsukareta.', cn:'累到走不動了。' }
    ]
  },
  {
    pattern: '〜なんか / 〜なんて',
    level: 'N3',
    short: '〜之類的（輕蔑／謙遜）',
    explain: '名詞＋なんか／なんて。① 舉例 ② 輕視 ③ 謙遜。',
    examples: [
      { jp:'スポーツなんか苦手だ。', kana:'すぽーつなんかにがてだ。', romaji:'Supootsu nanka nigate da.', cn:'運動之類的我不擅長。' }
    ]
  },
  {
    pattern: '〜恐れがある',
    level: 'N3',
    short: '有〜的可能（負面）',
    explain: '辭書形／名詞の＋恐れがある。表示有不好的事發生的可能。',
    examples: [
      { jp:'台風が上陸する恐れがある。', kana:'たいふうがじょうりくするおそれがある。', romaji:'Taifuu ga jouriku suru osore ga aru.', cn:'颱風有可能登陸。' }
    ]
  },
  {
    pattern: '〜あまり',
    level: 'N3',
    short: '過於〜以致〜',
    explain: '辭書形／た形／い形／名詞の＋あまり。表示過度的後果。',
    examples: [
      { jp:'緊張のあまり、声が震えた。', kana:'きんちょうのあまり、こえがふるえた。', romaji:'Kinchou no amari, koe ga furueta.', cn:'過於緊張，聲音都顫抖了。' }
    ]
  },
  {
    pattern: '〜ところで',
    level: 'N3',
    short: '即使〜也（無濟於事）',
    explain: 'た形＋ところで。表示即使做了，也沒結果。',
    examples: [
      { jp:'今さら謝ったところで、許してもらえない。', kana:'いまさらあやまったところで、ゆるしてもらえない。', romaji:'Imasara ayamatta tokoro de, yurushite moraenai.', cn:'事到如今道歉也得不到原諒。' }
    ]
  },
  {
    pattern: '〜とか〜とか',
    level: 'N3',
    short: '〜啦〜啦',
    explain: '名詞／辭書形＋とか〜とか。口語舉例。',
    examples: [
      { jp:'お寿司とか天ぷらとかが好きです。', kana:'おすしとかてんぷらとかがすきです。', romaji:'Osushi toka tenpura toka ga suki desu.', cn:'喜歡壽司啦天婦羅啦這些。' }
    ]
  },
  {
    pattern: '〜風',
    level: 'N3',
    short: '〜風格',
    explain: '名詞＋風（ふう）。表示某種風格／樣式。',
    examples: [
      { jp:'日本風の家。', kana:'にほんふうのいえ。', romaji:'Nihon-fuu no ie.', cn:'日式風格的房子。' }
    ]
  },
  {
    pattern: '〜こと（命令）',
    level: 'N3',
    short: '應該〜（書面命令）',
    explain: '辭書形／ない形＋こと。書面語的命令／規定形式，常見於注意事項。',
    examples: [
      { jp:'授業中は静かにすること。', kana:'じゅぎょうちゅうはしずかにすること。', romaji:'Jugyou-chuu wa shizuka ni suru koto.', cn:'上課時應保持安靜。' }
    ]
  },
  {
    pattern: '〜まま',
    level: 'N3',
    short: '保持〜的狀態',
    explain: 'た形／ない形／い形／な形＋な／名詞の＋まま。狀態維持不變。N3 加強對「〜まま」的書面用法。',
    examples: [
      { jp:'昔のままの町並み。', kana:'むかしのままのまちなみ。', romaji:'Mukashi no mama no machinami.', cn:'保持昔日樣貌的街景。' }
    ]
  },
  {
    pattern: '〜まで',
    level: 'N3',
    short: '甚至〜',
    explain: '名詞／辭書形＋まで。除了「到」之外，N3 用法為「甚至／連…都」，強調極端。',
    examples: [
      { jp:'子供にまで馬鹿にされた。', kana:'こどもにまでばかにされた。', romaji:'Kodomo ni made baka ni sareta.', cn:'連小孩都看不起我。' }
    ]
  },
  {
    pattern: 'お／ご〜いただく',
    level: 'N3',
    short: '請（敬語謙讓）',
    explain: 'お＋ます形／ご＋名詞＋いただく。比「〜てもらう」更謙遜，正式商務場合。',
    examples: [
      { jp:'お待ちいただけますか。', kana:'おまちいただけますか。', romaji:'Omachi itadakemasu ka.', cn:'可以請您等一下嗎？' }
    ]
  },
  {
    pattern: '〜させていただく',
    level: 'N3',
    short: '請允許我〜（極謙遜）',
    explain: '使役形＋ていただく。請求對方允許自己做某事，最謙遜的表達。',
    examples: [
      { jp:'本日休ませていただきます。', kana:'ほんじつやすませていただきます。', romaji:'Honjitsu yasumasete itadakimasu.', cn:'今日請容我請假。' }
    ]
  },

  // ================================================
  // ====              N2 文法 (~100 條)           ====
  // ================================================

  {
    pattern: '〜うえ（に）',
    level: 'N2',
    short: '不僅〜還〜',
    explain: '普通形＋うえ（に）。表示遞進，疊加。',
    examples: [
      { jp:'頭がいいうえに、人柄もいい。', kana:'あたまがいいうえに、ひとがらもいい。', romaji:'Atama ga ii ue ni, hitogara mo ii.', cn:'頭腦好，為人也好。' }
    ]
  },
  {
    pattern: '〜うえで',
    level: 'N2',
    short: '在〜方面、〜之後',
    explain: '辭書形／た形／名詞の＋うえで。① 在〜方面 ② 在〜的基礎上。',
    examples: [
      { jp:'本人とよく相談したうえで決めましょう。', kana:'ほんにんとよくそうだんしたうえできめましょう。', romaji:'Honnin to yoku soudan shita ue de kimemashou.', cn:'與本人充分商量後再決定吧。' }
    ]
  },
  {
    pattern: '〜うえは',
    level: 'N2',
    short: '既然〜就〜',
    explain: '辭書形／た形＋うえは。表示既然如此就必須〜，後接決心或必然結果。',
    examples: [
      { jp:'引き受けたうえは、最後までやり遂げる。', kana:'ひきうけたうえは、さいごまでやりとげる。', romaji:'Hikiuketa ue wa, saigo made yaritogeru.', cn:'既然接下了，就要做到最後。' }
    ]
  },
  {
    pattern: '〜ものか',
    level: 'N2',
    short: '才不〜！（強烈否定）',
    explain: '普通形＋ものか。「絕對不〜」的強烈反問語氣。',
    examples: [
      { jp:'もう二度とあいつに頼むものか。', kana:'もうにどとあいつにたのむものか。', romaji:'Mou nido to aitsu ni tanomu mono ka.', cn:'我才不會再拜託他了。' }
    ]
  },
  {
    pattern: '〜ものなら',
    level: 'N2',
    short: '如果能〜的話',
    explain: '可能形＋ものなら。表示困難但希望實現的假設。',
    examples: [
      { jp:'帰れるものなら今すぐ帰りたい。', kana:'かえれるものならいますぐかえりたい。', romaji:'Kaereru mono nara ima sugu kaeritai.', cn:'如果能回去的話現在就想回去。' }
    ]
  },
  {
    pattern: '〜ものを',
    level: 'N2',
    short: '明明〜可惜卻〜',
    explain: '普通形＋ものを。表示遺憾、責備，「本可以…卻沒」。',
    examples: [
      { jp:'もっと早く言ってくれればよかったものを。', kana:'もっとはやくいってくれればよかったものを。', romaji:'Motto hayaku itte kurereba yokatta mono wo.', cn:'你早點說就好了。' }
    ]
  },
  {
    pattern: '〜やいなや',
    level: 'N2',
    short: '一〜就〜（書面）',
    explain: '辭書形＋や否や。書面語，表前後動作緊接發生。',
    examples: [
      { jp:'発表されるや否や、商品は売り切れた。', kana:'はっぴょうされるやいなや、しょうひんはうりきれた。', romaji:'Happyou sareru ya inaya, shouhin wa urikireta.', cn:'一發表，商品就售完了。' }
    ]
  },
  {
    pattern: '〜が早いか',
    level: 'N2',
    short: '剛〜立刻就〜',
    explain: '辭書形＋が早いか。表示一發生立刻接著做下一個動作。',
    examples: [
      { jp:'家に着くが早いか、彼はベッドに倒れこんだ。', kana:'いえにつくがはやいか、かれはべっどにたおれこんだ。', romaji:'Ie ni tsuku ga hayai ka, kare wa beddo ni taorekonda.', cn:'剛到家，他就倒在床上。' }
    ]
  },
  {
    pattern: '〜なり',
    level: 'N2',
    short: '剛一〜就〜',
    explain: '辭書形＋なり。前後動作緊接，主語一致。',
    examples: [
      { jp:'席に着くなり、本を読み始めた。', kana:'せきにつくなり、ほんをよみはじめた。', romaji:'Seki ni tsuku nari, hon wo yomihajimeta.', cn:'剛坐下就開始看書。' }
    ]
  },
  {
    pattern: '〜つつも',
    level: 'N2',
    short: '雖然〜還是〜',
    explain: 'ます形（去ます）＋つつも。書面逆接，前後矛盾的行為。',
    examples: [
      { jp:'悪いと知りつつも、嘘をついた。', kana:'わるいとしりつつも、うそをついた。', romaji:'Warui to shiritsutsumo, uso wo tsuita.', cn:'明知不對還是說了謊。' }
    ]
  },
  {
    pattern: '〜にあって',
    level: 'N2',
    short: '在〜的時候／處於〜',
    explain: '名詞＋にあって。書面語，表示處於某特殊狀況。',
    examples: [
      { jp:'非常事態にあっては、冷静さが必要だ。', kana:'ひじょうじたいにあっては、れいせいさがひつようだ。', romaji:'Hijou jitai ni atte wa, reisei sa ga hitsuyou da.', cn:'處於緊急狀態時，必須冷靜。' }
    ]
  },
  {
    pattern: '〜にあたって',
    level: 'N2',
    short: '在〜之際',
    explain: '辭書形／名詞＋にあたって。表示在某重大事件之際，較正式。',
    examples: [
      { jp:'新年度にあたって、抱負を述べたい。', kana:'しんねんどにあたって、ほうふをのべたい。', romaji:'Shinnendo ni atatte, houfu wo nobetai.', cn:'在新年度之際，想表達抱負。' }
    ]
  },
  {
    pattern: '〜において',
    level: 'N2',
    short: '在〜（書面）',
    explain: '名詞＋において／における。書面語，表示場所、時間、領域。',
    examples: [
      { jp:'本日の会議は3階の会議室において行います。', kana:'ほんじつのかいぎは3かいのかいぎしつにおいておこないます。', romaji:'Honjitsu no kaigi wa 3-kai no kaigishitsu ni oite okonaimasu.', cn:'今天的會議在三樓會議室舉行。' }
    ]
  },
  {
    pattern: '〜にしたら / 〜にすれば',
    level: 'N2',
    short: '對〜來說',
    explain: '名詞＋にしたら／にすれば。從某人的角度看。比「にとって」更主觀。',
    examples: [
      { jp:'親にしてみれば心配なのだろう。', kana:'おやにしてみればしんぱいなのだろう。', romaji:'Oya ni shite mireba shinpai na no darou.', cn:'從父母角度看會擔心吧。' }
    ]
  },
  {
    pattern: '〜にひきかえ',
    level: 'N2',
    short: '與〜相反',
    explain: '名詞の／普通形＋にひきかえ。書面語，強烈對比。',
    examples: [
      { jp:'兄は活発なのにひきかえ、弟はおとなしい。', kana:'あにはかっぱつなのにひきかえ、おとうとはおとなしい。', romaji:'Ani wa kappatsu na no ni hikikae, otouto wa otonashii.', cn:'哥哥活潑，弟弟卻文靜。' }
    ]
  },
  {
    pattern: '〜にもまして',
    level: 'N2',
    short: '比〜更',
    explain: '名詞／疑問詞＋にもまして。表示程度超過某事物。',
    examples: [
      { jp:'今年は去年にもまして暑い。', kana:'ことしはきょねんにもましてあつい。', romaji:'Kotoshi wa kyonen ni mo mashite atsui.', cn:'今年比去年更熱。' }
    ]
  },
  {
    pattern: '〜にかぎる',
    level: 'N2',
    short: '〜最棒',
    explain: '辭書形／ない形／名詞＋にかぎる。表示說話者主觀認為「最好」。',
    examples: [
      { jp:'疲れた時はお風呂に入るに限る。', kana:'つかれたときはおふろにはいるにかぎる。', romaji:'Tsukareta toki wa ofuro ni hairu ni kagiru.', cn:'累的時候泡澡最棒。' }
    ]
  },
  {
    pattern: '〜にかぎって',
    level: 'N2',
    short: '偏偏〜的時候',
    explain: '名詞＋にかぎって。表示「偏偏只有這時候、這個人」，常帶不滿。',
    examples: [
      { jp:'急いでいる時に限って電車が遅れる。', kana:'いそいでいるときにかぎってでんしゃがおくれる。', romaji:'Isoide iru toki ni kagitte densha ga okureru.', cn:'偏偏在急的時候電車誤點。' }
    ]
  },
  {
    pattern: '〜に限らず',
    level: 'N2',
    short: '不限於〜',
    explain: '名詞＋に限らず。表示不只是某範圍。',
    examples: [
      { jp:'子供に限らず、大人も楽しめる。', kana:'こどもにかぎらず、おとなもたのしめる。', romaji:'Kodomo ni kagirazu, otona mo tanoshimeru.', cn:'不只小孩，大人也能享受。' }
    ]
  },
  {
    pattern: '〜にかかわらず',
    level: 'N2',
    short: '不論〜',
    explain: '名詞／普通形＋にかかわらず。表示與某條件無關。',
    examples: [
      { jp:'天候にかかわらず、試合は行われる。', kana:'てんこうにかかわらず、しあいはおこなわれる。', romaji:'Tenkou ni kakawarazu, shiai wa okonawareru.', cn:'不論天氣如何，比賽都會舉行。' }
    ]
  },
  {
    pattern: '〜にもかかわらず',
    level: 'N2',
    short: '儘管〜還是',
    explain: '名詞／普通形＋にもかかわらず。強烈逆接，書面。',
    examples: [
      { jp:'雨にもかかわらず、多くの人が集まった。', kana:'あめにもかかわらず、おおくのひとがあつまった。', romaji:'Ame ni mo kakawarazu, ooku no hito ga atsumatta.', cn:'儘管下雨，仍聚集了很多人。' }
    ]
  },
  {
    pattern: '〜を問わず',
    level: 'N2',
    short: '不論〜',
    explain: '名詞＋を問わず。前接二元對立或時間／國別。',
    examples: [
      { jp:'年齢を問わず誰でも参加できる。', kana:'ねんれいをとわずだれでもさんかできる。', romaji:'Nenrei wo towazu dare demo sanka dekiru.', cn:'不論年齡誰都能參加。' }
    ]
  },
  {
    pattern: '〜はもちろん / 〜はもとより',
    level: 'N2',
    short: '不用說〜也〜',
    explain: '名詞＋はもちろん／はもとより。表示前項當然，後項也包含。',
    examples: [
      { jp:'英語はもちろん、中国語も話せる。', kana:'えいごはもちろん、ちゅうごくごもはなせる。', romaji:'Eigo wa mochiron, chuugokugo mo hanaseru.', cn:'英語不用說，中文也會。' }
    ]
  },
  {
    pattern: '〜はおろか',
    level: 'N2',
    short: '別說〜連〜都',
    explain: '名詞＋はおろか。表示連最基本的都〜，何況〜，常帶負面。',
    examples: [
      { jp:'歩くことはおろか、立つこともできない。', kana:'あるくことはおろか、たつこともできない。', romaji:'Aruku koto wa oroka, tatsu koto mo dekinai.', cn:'別說走，連站都站不起來。' }
    ]
  },
  {
    pattern: '〜はさておき',
    level: 'N2',
    short: '〜先不談',
    explain: '名詞＋はさておき。表示先擱置某話題，討論另一個。',
    examples: [
      { jp:'冗談はさておき、本題に入ろう。', kana:'じょうだんはさておき、ほんだいにはいろう。', romaji:'Joudan wa sateoki, hondai ni hairou.', cn:'玩笑先擱一邊，進入正題吧。' }
    ]
  },
  {
    pattern: '〜抜きで / 〜抜きに',
    level: 'N2',
    short: '不要〜、省略〜',
    explain: '名詞＋抜きで／抜きに。表示去除某物。',
    examples: [
      { jp:'冗談抜きで真面目に答えてください。', kana:'じょうだんぬきでまじめにこたえてください。', romaji:'Joudan nuki de majime ni kotaete kudasai.', cn:'別開玩笑，請認真回答。' }
    ]
  },
  {
    pattern: '〜きり / 〜っきり',
    level: 'N2',
    short: '只〜、〜後就一直',
    explain: '名詞／た形／ます形＋きり。① 限定 ② 此後一直如此。',
    examples: [
      { jp:'二人きりで話したい。', kana:'ふたりきりではなしたい。', romaji:'Futari kiri de hanashitai.', cn:'想兩人單獨談話。' }
    ]
  },
  {
    pattern: '〜次第だ',
    level: 'N2',
    short: '取決於〜',
    explain: '名詞＋次第だ／次第で。「依〜而定」。',
    examples: [
      { jp:'結果は努力次第だ。', kana:'けっかはどりょくしだいだ。', romaji:'Kekka wa doryoku shidai da.', cn:'結果取決於努力。' }
    ]
  },
  {
    pattern: '〜次第（一〜就〜）',
    level: 'N2',
    short: '一〜就馬上',
    explain: 'ます形（去ます）＋次第。正式商務用語。',
    examples: [
      { jp:'到着次第ご連絡します。', kana:'とうちゃくしだいごれんらくします。', romaji:'Touchaku shidai gorenraku shimasu.', cn:'一到達就會聯絡您。' }
    ]
  },
  {
    pattern: '〜のみならず',
    level: 'N2',
    short: '不僅〜還〜（書面）',
    explain: '普通形／名詞＋のみならず。書面版「〜ばかりでなく」。',
    examples: [
      { jp:'彼は学者のみならず、政治家としても有名だ。', kana:'かれはがくしゃのみならず、せいじかとしてもゆうめいだ。', romaji:'Kare wa gakusha nominarazu, seijika to shite mo yuumei da.', cn:'他不僅是學者，作為政治家也很有名。' }
    ]
  },
  {
    pattern: '〜のみ',
    level: 'N2',
    short: '只、僅（書面）',
    explain: '名詞／普通形＋のみ。書面正式版的「だけ」。',
    examples: [
      { jp:'資格を持つ人のみ応募可能。', kana:'しかくをもつひとのみおうぼかのう。', romaji:'Shikaku wo motsu hito nomi oubo kanou.', cn:'僅有資格者可應徵。' }
    ]
  },
  {
    pattern: '〜だけしか〜ない',
    level: 'N2',
    short: '只有〜',
    explain: '結合「だけ」＋「しか〜ない」，強調少。',
    examples: [
      { jp:'これだけしか残っていない。', kana:'これだけしかのこっていない。', romaji:'Kore dake shika nokotte inai.', cn:'只剩這些了。' }
    ]
  },
  {
    pattern: '〜まじき',
    level: 'N2',
    short: '不應該〜（譴責）',
    explain: '辭書形＋まじき＋名詞。書面語，強烈譴責不該有的行為。',
    examples: [
      { jp:'医者にあるまじき行為だ。', kana:'いしゃにあるまじきこういだ。', romaji:'Isha ni aru majiki koui da.', cn:'這是醫生不該有的行為。' }
    ]
  },
  {
    pattern: '〜まい',
    level: 'N2',
    short: '不會吧／不打算〜',
    explain: '辭書形＋まい。① 推測「不會〜吧」② 否定意志「不打算〜」。書面。',
    examples: [
      { jp:'もう同じ過ちは繰り返すまい。', kana:'もうおなじあやまちはくりかえすまい。', romaji:'Mou onaji ayamachi wa kurikaesu mai.', cn:'我不會再犯同樣的錯。' }
    ]
  },
  {
    pattern: '〜ずにはいられない',
    level: 'N2',
    short: '不由得〜',
    explain: 'ない形（去ない）＋ずにはいられない。表示控制不住。例外：する→せずにはいられない。',
    examples: [
      { jp:'美しい景色を見て感動せずにはいられなかった。', kana:'うつくしいけしきをみてかんどうせずにはいられなかった。', romaji:'Utsukushii keshiki wo mite kandou sezu ni wa irarenakatta.', cn:'看到美景不由得感動。' }
    ]
  },
  {
    pattern: '〜ずにはおかない',
    level: 'N2',
    short: '必然會〜',
    explain: 'ない形（去ない）＋ずにはおかない。書面，表示必然導致某結果。',
    examples: [
      { jp:'この事実は人々を驚かせずにはおかない。', kana:'このじじつはひとびとをおどろかせずにはおかない。', romaji:'Kono jijitsu wa hitobito wo odorokasezu ni wa okanai.', cn:'這個事實必定使人們吃驚。' }
    ]
  },
  {
    pattern: '〜ずにすむ',
    level: 'N2',
    short: '不用〜就解決',
    explain: 'ない形（去ない）＋ずにすむ。「〜なくてもいい」的書面版本。',
    examples: [
      { jp:'時間どおりに着いたので、走らずに済んだ。', kana:'じかんどおりについたので、はしらずにすんだ。', romaji:'Jikan doori ni tsuita node, hashirazu ni sunda.', cn:'準時到了，不用跑。' }
    ]
  },
  {
    pattern: '〜ずじまい',
    level: 'N2',
    short: '結果沒有〜',
    explain: 'ない形（去ない）＋ずじまい。表示原本想做卻沒做成，帶遺憾。',
    examples: [
      { jp:'結局、彼には会えずじまいだった。', kana:'けっきょく、かれにはあえずじまいだった。', romaji:'Kekkyoku, kare ni wa aezu jimai datta.', cn:'結果還是沒能見到他。' }
    ]
  },
  {
    pattern: '〜てたまらない',
    level: 'N2',
    short: '〜得受不了',
    explain: 'い形（去い）＋くて／な形＋で／動詞て形＋たまらない。表示感情或感覺強烈。',
    examples: [
      { jp:'喉が乾いてたまらない。', kana:'のどがかわいてたまらない。', romaji:'Nodo ga kawaite tamaranai.', cn:'渴得受不了。' }
    ]
  },
  {
    pattern: '〜てしょうがない',
    level: 'N2',
    short: '〜得不得了',
    explain: 'て形＋しょうがない／しかたがない。「〜てたまらない」的口語版。',
    examples: [
      { jp:'お腹が空いてしょうがない。', kana:'おなかがすいてしょうがない。', romaji:'Onaka ga suite shou ga nai.', cn:'餓得不得了。' }
    ]
  },
  {
    pattern: '〜てならない',
    level: 'N2',
    short: '〜得不得了（感情）',
    explain: 'て形＋ならない。多用於自發感情，書面。',
    examples: [
      { jp:'故郷が懐かしくてならない。', kana:'こきょうがなつかしくてならない。', romaji:'Kokyou ga natsukashikute naranai.', cn:'非常想念故鄉。' }
    ]
  },
  {
    pattern: '〜てからでないと',
    level: 'N2',
    short: '不先〜的話就不能〜',
    explain: 'て形＋からでないと／からでなければ。表示先決條件。',
    examples: [
      { jp:'宿題が終わってからでないと、遊べない。', kana:'しゅくだいがおわってからでないと、あそべない。', romaji:'Shukudai ga owatte kara de nai to, asobenai.', cn:'作業沒做完不能玩。' }
    ]
  },
  {
    pattern: '〜ところに / 〜ところへ / 〜ところを',
    level: 'N2',
    short: '正在〜的時候',
    explain: '辭書形／ている／た形＋ところに／へ／を。表示某動作的當下發生別的事。',
    examples: [
      { jp:'寝ているところに電話がかかってきた。', kana:'ねているところにでんわがかかってきた。', romaji:'Nete iru tokoro ni denwa ga kakatte kita.', cn:'正在睡的時候電話響了。' }
    ]
  },
  {
    pattern: '〜とは',
    level: 'N2',
    short: '竟然〜！（驚訝）',
    explain: '普通形＋とは。表示強烈意外、驚訝、感嘆。',
    examples: [
      { jp:'彼が遅刻するとは思わなかった。', kana:'かれがちこくするとはおもわなかった。', romaji:'Kare ga chikoku suru to wa omowanakatta.', cn:'沒想到他竟然遲到。' }
    ]
  },
  {
    pattern: '〜とはいえ',
    level: 'N2',
    short: '雖說〜但〜',
    explain: '普通形／名詞＋とはいえ。「雖然〜實際上〜」。',
    examples: [
      { jp:'もう4月とはいえ、まだ寒い。', kana:'もう4がつとはいえ、まださむい。', romaji:'Mou 4-gatsu to wa ie, mada samui.', cn:'雖然已是四月，還是冷。' }
    ]
  },
  {
    pattern: '〜といったら',
    level: 'N2',
    short: '說到〜真是…！',
    explain: '名詞＋といったら。表示對某事的感嘆，多接形容詞。',
    examples: [
      { jp:'あの料理のおいしさといったら！', kana:'あのりょうりのおいしさといったら！', romaji:'Ano ryouri no oishisa to ittara!', cn:'那道菜的美味，真不得了！' }
    ]
  },
  {
    pattern: '〜というより',
    level: 'N2',
    short: '與其說〜不如說〜',
    explain: '普通形／名詞＋というより。修正前說法。',
    examples: [
      { jp:'彼は天才というより努力家だ。', kana:'かれはてんさいというよりどりょくかだ。', romaji:'Kare wa tensai to iu yori doryokuka da.', cn:'與其說他是天才，不如說努力。' }
    ]
  },
  {
    pattern: '〜というものだ',
    level: 'N2',
    short: '這才算〜',
    explain: '普通形／名詞＋というものだ。對事物下結論評論。',
    examples: [
      { jp:'これが青春というものだ。', kana:'これがせいしゅんというものだ。', romaji:'Kore ga seishun to iu mono da.', cn:'這才叫青春啊。' }
    ]
  },
  {
    pattern: '〜どころか',
    level: 'N2',
    short: '別說〜了',
    explain: '名詞／普通形＋どころか。強烈否定前提，提出更極端的事實。',
    examples: [
      { jp:'休むどころか、休日も働いている。', kana:'やすむどころか、きゅうじつもはたらいている。', romaji:'Yasumu dokoro ka, kyuujitsu mo hataraite iru.', cn:'別說休息了，連假日都在工作。' }
    ]
  },
  {
    pattern: '〜たところで',
    level: 'N2',
    short: '即使〜也〜',
    explain: 'た形＋ところで。表示假設即使做也無濟於事。',
    examples: [
      { jp:'今さら謝ったところで遅い。', kana:'いまさらあやまったところでおそい。', romaji:'Imasara ayamatta tokoro de osoi.', cn:'事到如今道歉也晚了。' }
    ]
  },
  {
    pattern: '〜ばかりか',
    level: 'N2',
    short: '不僅〜而且〜',
    explain: '普通形／名詞＋ばかりか。表示遞進。',
    examples: [
      { jp:'雨ばかりか、雷まで鳴り始めた。', kana:'あめばかりか、かみなりまでなりはじめた。', romaji:'Ame bakari ka, kaminari made nari hajimeta.', cn:'不只下雨，連雷都打了。' }
    ]
  },
  {
    pattern: '〜にこたえて',
    level: 'N2',
    short: '回應〜',
    explain: '名詞＋にこたえて。表示回應期待、要求、邀請。',
    examples: [
      { jp:'ファンの期待にこたえて優勝した。', kana:'ふぁんのきたいにこたえてゆうしょうした。', romaji:'Fan no kitai ni kotaete yuushou shita.', cn:'回應粉絲期待奪冠了。' }
    ]
  },
  {
    pattern: '〜にそって',
    level: 'N2',
    short: '沿著〜、依〜',
    explain: '名詞＋にそって。① 沿著（道路、河川）② 依（計畫、方針）。',
    examples: [
      { jp:'計画に沿って進めましょう。', kana:'けいかくにそってすすめましょう。', romaji:'Keikaku ni sotte susumemashou.', cn:'依計畫進行吧。' }
    ]
  },
  {
    pattern: '〜にしたところで',
    level: 'N2',
    short: '即使〜也〜',
    explain: '普通形／名詞＋にしたところで。「即使是〜也〜」，常接困難或無奈。',
    examples: [
      { jp:'プロにしたところで、ミスはする。', kana:'ぷろにしたところで、みすはする。', romaji:'Puro ni shita tokoro de, misu wa suru.', cn:'即使是專業也會失誤。' }
    ]
  },
  {
    pattern: '〜にしろ / 〜にせよ',
    level: 'N2',
    short: '即使〜也／不論〜',
    explain: '普通形／名詞＋にしろ／にせよ。並列、讓步。',
    examples: [
      { jp:'冗談にせよ、言っていいことと悪いことがある。', kana:'じょうだんにせよ、いっていいこととわるいことがある。', romaji:'Joudan ni seyo, itte ii koto to warui koto ga aru.', cn:'即使是玩笑，也有該說和不該說的。' }
    ]
  },
  {
    pattern: '〜ばこそ',
    level: 'N2',
    short: '正因為〜（強調）',
    explain: 'ば形＋こそ。書面語強調原因。',
    examples: [
      { jp:'あなたを思えばこそ、厳しく言うのだ。', kana:'あなたをおもえばこそ、きびしくいうのだ。', romaji:'Anata wo omoeba koso, kibishiku iu no da.', cn:'正因為為你著想，才嚴厲說話。' }
    ]
  },
  {
    pattern: '〜からこそ',
    level: 'N2',
    short: '正因為〜',
    explain: '普通形＋からこそ。「ばこそ」的口語版，強調理由。',
    examples: [
      { jp:'家族がいるからこそ頑張れる。', kana:'かぞくがいるからこそがんばれる。', romaji:'Kazoku ga iru kara koso ganbareru.', cn:'正因為有家人，才能努力。' }
    ]
  },
  {
    pattern: '〜からといって',
    level: 'N2',
    short: '不能因為〜就〜',
    explain: '普通形＋からといって＋否定。前項不足以成為後項根據。',
    examples: [
      { jp:'安いからといって、品質が悪いとは限らない。', kana:'やすいからといって、ひんしつがわるいとはかぎらない。', romaji:'Yasui kara to itte, hinshitsu ga warui to wa kagiranai.', cn:'便宜不代表品質就差。' }
    ]
  },
  {
    pattern: '〜あげく',
    level: 'N2',
    short: '結果〜（負面）',
    explain: 'た形／名詞の＋あげく。長期努力後得到不好的結果。',
    examples: [
      { jp:'考えに考えたあげく、断ることにした。', kana:'かんがえにかんがえたあげく、ことわることにした。', romaji:'Kangae ni kangaeta ageku, kotowaru koto ni shita.', cn:'再三考慮後決定拒絕。' }
    ]
  },
  {
    pattern: '〜末に',
    level: 'N2',
    short: '最終〜',
    explain: 'た形／名詞の＋末に。經過長時間努力後的結果，中性或正面。',
    examples: [
      { jp:'長年の研究の末に成功した。', kana:'ながねんのけんきゅうのすえにせいこうした。', romaji:'Naganen no kenkyuu no sue ni seikou shita.', cn:'經過多年研究終於成功。' }
    ]
  },
  {
    pattern: '〜ぶり / 〜ぶりに',
    level: 'N2',
    short: '時隔〜、〜的樣子',
    explain: '名詞／時間＋ぶり（に）。① 時隔多久 ② 樣子。',
    examples: [
      { jp:'10年ぶりに故郷に帰った。', kana:'10ねんぶりにこきょうにかえった。', romaji:'10-nen buri ni kokyou ni kaetta.', cn:'時隔 10 年回到故鄉。' }
    ]
  },
  {
    pattern: '〜つき',
    level: 'N2',
    short: '附帶〜',
    explain: '名詞＋つき。表示附帶某物。',
    examples: [
      { jp:'朝食つきのホテルに泊まる。', kana:'ちょうしょくつきのほてるにとまる。', romaji:'Choushoku tsuki no hoteru ni tomaru.', cn:'住附早餐的飯店。' }
    ]
  },
  {
    pattern: '〜向け',
    level: 'N2',
    short: '針對〜',
    explain: '名詞＋向け。表示針對某對象。',
    examples: [
      { jp:'子供向けの番組。', kana:'こどもむけのばんぐみ。', romaji:'Kodomo muke no bangumi.', cn:'兒童節目。' }
    ]
  },
  {
    pattern: '〜向き',
    level: 'N2',
    short: '適合〜',
    explain: '名詞＋向き。表示適合某對象（自然適合，不是設計來）。',
    examples: [
      { jp:'初心者向きの本。', kana:'しょしんしゃむきのほん。', romaji:'Shoshinsha muki no hon.', cn:'適合初學者的書。' }
    ]
  },
  {
    pattern: '〜あっての',
    level: 'N2',
    short: '有〜才有〜',
    explain: '名詞＋あっての＋名詞。表示因為前項存在，後項才得以成立。',
    examples: [
      { jp:'お客様あっての商売だ。', kana:'おきゃくさまあってのしょうばいだ。', romaji:'Okyakusama atte no shoubai da.', cn:'有顧客才有生意。' }
    ]
  },
  {
    pattern: '〜の極み',
    level: 'N2',
    short: '〜的極致',
    explain: '名詞＋の極み。表示達到極點，書面。',
    examples: [
      { jp:'感激の極みです。', kana:'かんげきのきわみです。', romaji:'Kangeki no kiwami desu.', cn:'感動到極點。' }
    ]
  },
  {
    pattern: '〜限り',
    level: 'N2',
    short: '只要〜就；〜的範圍內',
    explain: '辭書形／ている形／い形／名詞の＋限り。表示某範圍／條件。',
    examples: [
      { jp:'私が知っている限り、彼はそんなことをしない。', kana:'わたしがしっているかぎり、かれはそんなことをしない。', romaji:'Watashi ga shitte iru kagiri, kare wa sonna koto wo shinai.', cn:'就我所知，他不會做那種事。' }
    ]
  },
  {
    pattern: '〜たて',
    level: 'N2',
    short: '剛〜好',
    explain: 'ます形（去ます）＋たて。表示剛做完，狀態還新。',
    examples: [
      { jp:'焼きたてのパンは美味しい。', kana:'やきたてのぱんはおいしい。', romaji:'Yakitate no pan wa oishii.', cn:'剛烤好的麵包很好吃。' }
    ]
  },
  {
    pattern: '〜得る / 〜得ない',
    level: 'N2',
    short: '可以〜／不可能〜',
    explain: 'ます形（去ます）＋得る／得ない。書面，表示可能性。',
    examples: [
      { jp:'それはあり得る話だ。', kana:'それはありうるはなしだ。', romaji:'Sore wa ariuru hanashi da.', cn:'這是有可能的事。' },
      { jp:'そんなことはあり得ない。', kana:'そんなことはありえない。', romaji:'Sonna koto wa arienai.', cn:'那是不可能的。' }
    ]
  },
  {
    pattern: '〜かねる',
    level: 'N2',
    short: '難以〜',
    explain: 'ます形（去ます）＋かねる。客氣地表示「無法」。',
    examples: [
      { jp:'ご質問にはお答えしかねます。', kana:'ごしつもんにはおこたえしかねます。', romaji:'Goshitsumon ni wa okotae shikanemasu.', cn:'恕難回答您的問題。' }
    ]
  },
  {
    pattern: '〜かねない',
    level: 'N2',
    short: '可能會〜（負面）',
    explain: 'ます形（去ます）＋かねない。表示可能會發生不希望的事。',
    examples: [
      { jp:'そんなことを言うと、誤解されかねない。', kana:'そんなことをいうと、ごかいされかねない。', romaji:'Sonna koto wo iu to, gokai sare kanenai.', cn:'說那種話可能會被誤解。' }
    ]
  },
  {
    pattern: '〜まみれ',
    level: 'N2',
    short: '滿是〜（汙物）',
    explain: '名詞＋まみれ。表示沾滿某髒污。比「だらけ」更具體限於沾在表面。',
    examples: [
      { jp:'泥まみれになって帰ってきた。', kana:'どろまみれになってかえってきた。', romaji:'Doro mamire ni natte kaette kita.', cn:'滿身泥地回來了。' }
    ]
  },
  {
    pattern: '〜ずくめ',
    level: 'N2',
    short: '清一色〜',
    explain: '名詞＋ずくめ。表示全是同一色／類型，常用衣著或事件。',
    examples: [
      { jp:'今年はいいことずくめだった。', kana:'ことしはいいことずくめだった。', romaji:'Kotoshi wa ii koto zukume datta.', cn:'今年盡是好事。' }
    ]
  },
  {
    pattern: '〜げ',
    level: 'N2',
    short: '〜的樣子',
    explain: 'い形（去い）／な形＋げ。形成新な形容詞，表示外觀。',
    examples: [
      { jp:'悲しげな表情。', kana:'かなしげなひょうじょう。', romaji:'Kanashige na hyoujou.', cn:'悲傷的表情。' }
    ]
  },
  {
    pattern: '〜だらけ',
    level: 'N2',
    short: '滿是〜',
    explain: '名詞＋だらけ。表示充滿某物，多帶負面。',
    examples: [
      { jp:'机の上は埃だらけだ。', kana:'つくえのうえはほこりだらけだ。', romaji:'Tsukue no ue wa hokori darake da.', cn:'桌上滿是灰塵。' }
    ]
  },
  {
    pattern: '〜きる / 〜きれる / 〜きれない',
    level: 'N2',
    short: '完全〜／無法〜完',
    explain: 'ます形（去ます）＋きる／きれない。「徹底地」或「到極限」。',
    examples: [
      { jp:'マラソンを走りきった。', kana:'まらそんをはしりきった。', romaji:'Marason wo hashirikitta.', cn:'跑完了馬拉松。' }
    ]
  },
  {
    pattern: '〜のもとで / 〜のもとに',
    level: 'N2',
    short: '在〜之下',
    explain: '名詞＋のもとで／に。表示在某人指導／某條件下。',
    examples: [
      { jp:'先生のもとで研究を続けた。', kana:'せんせいのもとでけんきゅうをつづけた。', romaji:'Sensei no moto de kenkyuu wo tsuzuketa.', cn:'在老師指導下繼續研究。' }
    ]
  },
  {
    pattern: '〜たびに',
    level: 'N2',
    short: '每次〜就〜',
    explain: '辭書形／名詞の＋たびに。每次發生前項就接後項。',
    examples: [
      { jp:'会うたびに彼女は綺麗になっている。', kana:'あうたびにかのじょはきれいになっている。', romaji:'Au tabi ni kanojo wa kirei ni natte iru.', cn:'每次見面她都更漂亮。' }
    ]
  },
  {
    pattern: '〜にしたって',
    level: 'N2',
    short: '即使是〜也',
    explain: '名詞／普通形＋にしたって。「にしても」的口語。',
    examples: [
      { jp:'子供にしたって、それくらい分かる。', kana:'こどもにしたって、それくらいわかる。', romaji:'Kodomo ni shita tte, sore kurai wakaru.', cn:'就算小孩也懂這個。' }
    ]
  },
  {
    pattern: '〜ようでは',
    level: 'N2',
    short: '如果〜這樣的話（不行）',
    explain: '普通形＋ようでは。表示如此狀況令人擔憂。',
    examples: [
      { jp:'こんなことで諦めるようでは、成功できない。', kana:'こんなことであきらめるようでは、せいこうできない。', romaji:'Konna koto de akirameru you de wa, seikou dekinai.', cn:'這樣就放棄的話無法成功。' }
    ]
  },
  {
    pattern: 'お／ご〜願う',
    level: 'N2',
    short: '請（敬語請求）',
    explain: 'お＋ます形／ご＋名詞＋願う。比「お〜ください」更正式的請求。',
    examples: [
      { jp:'ご協力お願いいたします。', kana:'ごきょうりょくおねがいいたします。', romaji:'Gokyouryoku onegai itashimasu.', cn:'敬請協助。' }
    ]
  },
  {
    pattern: '〜てやまない',
    level: 'N2',
    short: '一直〜（強烈感情）',
    explain: '感情動詞て形＋やまない。書面，表示長久持有的感情。',
    examples: [
      { jp:'成功を願ってやみません。', kana:'せいこうをねがってやみません。', romaji:'Seikou wo negatte yamimasen.', cn:'衷心祝您成功。' }
    ]
  },
  {
    pattern: '〜にあたる',
    level: 'N2',
    short: '相當於〜、面對〜',
    explain: '名詞＋にあたる。① 相當於 ② 對應到。',
    examples: [
      { jp:'1ドルは何円にあたりますか。', kana:'1どるはなんえんにあたりますか。', romaji:'1-doru wa nan-en ni atarimasu ka.', cn:'1 美元相當於多少日圓？' }
    ]
  },
  {
    pattern: '〜にちなんで',
    level: 'N2',
    short: '與〜有關、取自〜',
    explain: '名詞＋にちなんで。表示取名／命名來自某事物。',
    examples: [
      { jp:'祖父の名前にちなんで、息子の名前をつけた。', kana:'そふのなまえにちなんで、むすこのなまえをつけた。', romaji:'Sofu no namae ni chinande, musuko no namae wo tsuketa.', cn:'取自祖父名字幫兒子取名。' }
    ]
  },
  {
    pattern: '〜をきっかけに / 〜を契機に',
    level: 'N2',
    short: '以〜為契機',
    explain: '名詞＋をきっかけに／を契機に。表示某事為起點開始另一事。',
    examples: [
      { jp:'留学をきっかけに、英語が好きになった。', kana:'りゅうがくをきっかけに、えいごがすきになった。', romaji:'Ryuugaku wo kikkake ni, eigo ga suki ni natta.', cn:'以留學為契機，喜歡上了英語。' }
    ]
  },
  {
    pattern: '〜をもとに',
    level: 'N2',
    short: '以〜為基礎',
    explain: '名詞＋をもとに。表示「根據前項做後項」。',
    examples: [
      { jp:'実話をもとに作られた映画。', kana:'じつわをもとにつくられたえいが。', romaji:'Jitsuwa wo moto ni tsukurareta eiga.', cn:'根據真實故事改編的電影。' }
    ]
  },
  {
    pattern: '〜を通じて / 〜を通して',
    level: 'N2',
    short: '透過〜、整個〜期間',
    explain: '名詞＋を通じて／を通して。① 透過某媒介 ② 在整個期間。',
    examples: [
      { jp:'友人を通じて知り合った。', kana:'ゆうじんをつうじてしりあった。', romaji:'Yuujin wo tsuujite shiriatta.', cn:'透過朋友認識的。' }
    ]
  },
  {
    pattern: '〜にわたって',
    level: 'N2',
    short: '長達〜、橫跨〜',
    explain: '名詞（時間／空間）＋にわたって。表示範圍廣大。',
    examples: [
      { jp:'10年にわたって研究を続けた。', kana:'10ねんにわたってけんきゅうをつづけた。', romaji:'10-nen ni watatte kenkyuu wo tsuzuketa.', cn:'長達 10 年持續研究。' }
    ]
  },
  {
    pattern: '〜に先立って',
    level: 'N2',
    short: '在〜之前',
    explain: '名詞＋に先立って。書面，表示某大事之前。',
    examples: [
      { jp:'試合に先立って、選手紹介が行われた。', kana:'しあいにさきだって、せんしゅしょうかいがおこなわれた。', romaji:'Shiai ni sakidatte, senshu shoukai ga okonawareta.', cn:'比賽前進行了選手介紹。' }
    ]
  },
  {
    pattern: '〜に応じて',
    level: 'N2',
    short: '依〜、根據〜',
    explain: '名詞＋に応じて。「依不同情況變化」。',
    examples: [
      { jp:'予算に応じてプランを選べる。', kana:'よさんにおうじてぷらんをえらべる。', romaji:'Yosan ni oujite puran wo eraberu.', cn:'依預算選擇方案。' }
    ]
  },
  {
    pattern: '〜にひかえて',
    level: 'N2',
    short: '在〜即將到來之際',
    explain: '名詞＋を／に控えて。表示重要事即將到來。',
    examples: [
      { jp:'試験を翌日に控えて緊張している。', kana:'しけんをよくじつにひかえてきんちょうしている。', romaji:'Shiken wo yokujitsu ni hikaete kinchou shite iru.', cn:'考試在明天，很緊張。' }
    ]
  },
  {
    pattern: '〜に至るまで',
    level: 'N2',
    short: '甚至到〜',
    explain: '名詞＋に至るまで。表示範圍極廣，連最後一項都包含。',
    examples: [
      { jp:'子供から大人に至るまで、誰でも楽しめる。', kana:'こどもからおとなにいたるまで、だれでもたのしめる。', romaji:'Kodomo kara otona ni itaru made, dare demo tanoshimeru.', cn:'從小孩到大人，任何人都能享受。' }
    ]
  },

  // ================================================
  // ====              N1 文法 (~80 條)            ====
  // ================================================

  {
    pattern: '〜あっての',
    level: 'N1',
    short: '有〜才有〜',
    explain: '名詞＋あっての＋名詞。表示前項是後項存在的不可缺條件。',
    examples: [
      { jp:'お客様あっての店だ。', kana:'おきゃくさまあってのみせだ。', romaji:'Okyakusama atte no mise da.', cn:'有顧客才有店家。' }
    ]
  },
  {
    pattern: '〜いかんによる / 〜いかんによらず',
    level: 'N1',
    short: '取決於〜／不論〜',
    explain: '名詞（の）＋いかんだ／いかんによる：取決於；〜いかんによらず／にかかわらず：不論。',
    examples: [
      { jp:'成功するかどうかは努力いかんによる。', kana:'せいこうするかどうかはどりょくいかんによる。', romaji:'Seikou suru ka douka wa doryoku ikan ni yoru.', cn:'是否成功取決於努力。' },
      { jp:'理由のいかんによらず、規則は守るべきだ。', kana:'りゆうのいかんによらず、きそくはまもるべきだ。', romaji:'Riyuu no ikan ni yorazu, kisoku wa mamoru beki da.', cn:'不論理由為何，都應遵守規則。' }
    ]
  },
  {
    pattern: '〜と思いきや',
    level: 'N1',
    short: '本以為〜結果〜',
    explain: '普通形＋と思いきや。表示與預期完全相反。',
    examples: [
      { jp:'勝ったと思いきや、逆転負けした。', kana:'かったとおもいきや、ぎゃくてんまけした。', romaji:'Katta to omoikiya, gyakuten make shita.', cn:'本以為贏了，結果被逆轉。' }
    ]
  },
  {
    pattern: '〜とあって',
    level: 'N1',
    short: '因為是〜（特殊狀況）',
    explain: '普通形／名詞＋とあって。表示因為某特殊原因產生對應結果。',
    examples: [
      { jp:'休日とあって、観光地は混雑していた。', kana:'きゅうじつとあって、かんこうちはこんざつしていた。', romaji:'Kyuujitsu to atte, kankouchi wa konzatsu shite ita.', cn:'因為是假日，景點很擠。' }
    ]
  },
  {
    pattern: '〜と相まって',
    level: 'N1',
    short: '與〜相互作用',
    explain: '名詞＋と相まって。表示與某因素互相搭配產生效果。',
    examples: [
      { jp:'努力と才能が相まって成功を収めた。', kana:'どりょくとさいのうがあいまってせいこうをおさめた。', romaji:'Doryoku to sainou ga aimatte seikou wo osameta.', cn:'努力與才能相結合，取得成功。' }
    ]
  },
  {
    pattern: '〜ないまでも',
    level: 'N1',
    short: '即使做不到〜也〜',
    explain: 'ない形＋までも。表示「即使不到X程度，也到Y程度」。',
    examples: [
      { jp:'毎日とは言わないまでも、週に一回は連絡してほしい。', kana:'まいにちとはいわないまでも、しゅうにいっかいはれんらくしてほしい。', romaji:'Mainichi to wa iwanai made mo, shuu ni ikkai wa renraku shite hoshii.', cn:'即使做不到每天，希望一週也聯絡一次。' }
    ]
  },
  {
    pattern: '〜ないものか',
    level: 'N1',
    short: '是不是有辦法〜',
    explain: 'ない形＋ものか／ものだろうか。表示強烈希望。',
    examples: [
      { jp:'何とかならないものか。', kana:'なんとかならないものか。', romaji:'Nantoka naranai mono ka.', cn:'有沒有什麼辦法呢？' }
    ]
  },
  {
    pattern: '〜ながらに',
    level: 'N1',
    short: '保持〜原貌、生來〜',
    explain: '名詞／ます形＋ながら（に）。表示維持某狀態、樣貌。',
    examples: [
      { jp:'昔ながらの町並み。', kana:'むかしながらのまちなみ。', romaji:'Mukashi nagara no machinami.', cn:'保有昔日風貌的街景。' },
      { jp:'生まれながらにして才能がある。', kana:'うまれながらにしてさいのうがある。', romaji:'Umare nagara ni shite sainou ga aru.', cn:'生來就有才能。' }
    ]
  },
  {
    pattern: '〜なくして',
    level: 'N1',
    short: '沒有〜就不能〜',
    explain: '名詞＋なくして。表示「若無前項則無後項」，書面。',
    examples: [
      { jp:'努力なくして成功はない。', kana:'どりょくなくしてせいこうはない。', romaji:'Doryoku nakushite seikou wa nai.', cn:'沒有努力就沒有成功。' }
    ]
  },
  {
    pattern: '〜ならでは',
    level: 'N1',
    short: '只有〜才有的',
    explain: '名詞＋ならでは＋の＋名詞。表示某事物獨有的特色。',
    examples: [
      { jp:'プロならではの技を見せた。', kana:'ぷろならではのわざをみせた。', romaji:'Puro narade wa no waza wo miseta.', cn:'展現了只有專業才有的技術。' }
    ]
  },
  {
    pattern: '〜なり〜なり',
    level: 'N1',
    short: '〜也好〜也好',
    explain: '辭書形／名詞＋なり×2。表示在數種選項中任選。',
    examples: [
      { jp:'電話なりメールなりで連絡してください。', kana:'でんわなりめーるなりでれんらくしてください。', romaji:'Denwa nari meeru nari de renraku shite kudasai.', cn:'打電話也好寄信也好，請聯絡我。' }
    ]
  },
  {
    pattern: '〜にかこつけて',
    level: 'N1',
    short: '藉著〜為由',
    explain: '名詞＋にかこつけて。表示利用某事為藉口。',
    examples: [
      { jp:'仕事にかこつけて遊んでいる。', kana:'しごとにかこつけてあそんでいる。', romaji:'Shigoto ni kakotsukete asonde iru.', cn:'藉口工作其實在玩。' }
    ]
  },
  {
    pattern: '〜にして',
    level: 'N1',
    short: '在〜（時候／程度）',
    explain: '名詞＋にして。表示「在某狀態下、到某程度才」。',
    examples: [
      { jp:'60歳にして大学に入った。', kana:'60さいにしてだいがくにはいった。', romaji:'60-sai ni shite daigaku ni haitta.', cn:'到 60 歲才進大學。' }
    ]
  },
  {
    pattern: '〜の至り',
    level: 'N1',
    short: '〜的極點',
    explain: '名詞＋の至り。表示最高程度的某感情。',
    examples: [
      { jp:'光栄の至りです。', kana:'こうえいのいたりです。', romaji:'Kouei no itari desu.', cn:'萬分榮幸。' }
    ]
  },
  {
    pattern: '〜の極み',
    level: 'N1',
    short: '〜的極致',
    explain: '名詞＋の極み。表示最極端的程度。',
    examples: [
      { jp:'贅沢の極みだ。', kana:'ぜいたくのきわみだ。', romaji:'Zeitaku no kiwami da.', cn:'奢侈到極點。' }
    ]
  },
  {
    pattern: '〜きらいがある',
    level: 'N1',
    short: '有〜的傾向（負面）',
    explain: '辭書形／名詞の＋きらいがある。表示有不好的傾向。',
    examples: [
      { jp:'彼は人を見下すきらいがある。', kana:'かれはひとをみくだすきらいがある。', romaji:'Kare wa hito wo mikudasu kirai ga aru.', cn:'他有看不起人的傾向。' }
    ]
  },
  {
    pattern: '〜ぐるみ',
    level: 'N1',
    short: '整個〜',
    explain: '名詞＋ぐるみ。表示「整體一起」。',
    examples: [
      { jp:'家族ぐるみで付き合っている。', kana:'かぞくぐるみでつきあっている。', romaji:'Kazoku gurumi de tsukiatte iru.', cn:'兩家家庭一起來往。' }
    ]
  },
  {
    pattern: '〜たりとも',
    level: 'N1',
    short: '即使是〜也（不）',
    explain: '名詞（一＋量詞）＋たりとも＋否定。書面，強烈否定。',
    examples: [
      { jp:'一日たりとも忘れたことはない。', kana:'いちにちたりともわすれたことはない。', romaji:'Ichinichi tari to mo wasureta koto wa nai.', cn:'一天也未曾忘記。' }
    ]
  },
  {
    pattern: '〜だに',
    level: 'N1',
    short: '連〜都〜',
    explain: '辭書形／名詞＋だに。書面，「連〜都〜」，常與否定或感情詞並用。',
    examples: [
      { jp:'想像するだに恐ろしい。', kana:'そうぞうするだにおそろしい。', romaji:'Souzou suru dani osoroshii.', cn:'光是想像就可怕。' }
    ]
  },
  {
    pattern: '〜すら / 〜さえ',
    level: 'N1',
    short: '連〜都〜',
    explain: '名詞＋すら／さえ。書面用「すら」更強烈。',
    examples: [
      { jp:'家族にすら言えない秘密。', kana:'かぞくにすらいえないひみつ。', romaji:'Kazoku ni sura ienai himitsu.', cn:'連家人都不能說的秘密。' }
    ]
  },
  {
    pattern: '〜ともなしに',
    level: 'N1',
    short: '無意間〜',
    explain: '辭書形＋ともなく／ともなしに。表示沒有特定意圖地做某事。',
    examples: [
      { jp:'見るともなしにテレビを見ていた。', kana:'みるともなしにてれびをみていた。', romaji:'Miru to mo nashi ni terebi wo mite ita.', cn:'漫不經心地看著電視。' }
    ]
  },
  {
    pattern: '〜ふしがある',
    level: 'N1',
    short: '有〜跡象',
    explain: '普通形＋ふしがある。表示有理由懷疑某事。',
    examples: [
      { jp:'彼は何か隠しているふしがある。', kana:'かれはなにかかくしているふしがある。', romaji:'Kare wa nanika kakushite iru fushi ga aru.', cn:'他似乎在隱瞞什麼。' }
    ]
  },
  {
    pattern: '〜まじき',
    level: 'N1',
    short: '不應有的〜',
    explain: '辭書形＋まじき＋名詞。書面語強烈譴責。',
    examples: [
      { jp:'教師にあるまじき発言だ。', kana:'きょうしにあるまじきはつげんだ。', romaji:'Kyoushi ni aru majiki hatsugen da.', cn:'這是身為教師不該說的話。' }
    ]
  },
  {
    pattern: '〜までもない',
    level: 'N1',
    short: '不必〜',
    explain: '辭書形＋までもない。表示沒必要做某事。',
    examples: [
      { jp:'言うまでもなく、健康が一番大切だ。', kana:'いうまでもなく、けんこうがいちばんたいせつだ。', romaji:'Iu made mo naku, kenkou ga ichiban taisetsu da.', cn:'不用說，健康最重要。' }
    ]
  },
  {
    pattern: '〜まみれ',
    level: 'N1',
    short: '滿是〜（汙物）',
    explain: '名詞＋まみれ。表示沾滿髒污。',
    examples: [
      { jp:'血まみれになって倒れていた。', kana:'ちまみれになってたおれていた。', romaji:'Chi mamire ni natte taorete ita.', cn:'渾身是血地倒下了。' }
    ]
  },
  {
    pattern: '〜ようが / 〜ようと',
    level: 'N1',
    short: '不論〜',
    explain: '意志形＋が／と。表示不論怎樣都〜。',
    examples: [
      { jp:'何を言われようと気にしない。', kana:'なにをいわれようときにしない。', romaji:'Nani wo iwareyou to ki ni shinai.', cn:'不論被說什麼都不在乎。' }
    ]
  },
  {
    pattern: '〜をおいて',
    level: 'N1',
    short: '除了〜沒有別的',
    explain: '名詞＋をおいて＋否定。表示「沒有比這個更〜的」。',
    examples: [
      { jp:'この仕事ができるのは、彼をおいていない。', kana:'このしごとができるのは、かれをおいていない。', romaji:'Kono shigoto ga dekiru no wa, kare wo oite inai.', cn:'能做這份工作的，除他之外沒別人。' }
    ]
  },
  {
    pattern: '〜をかえりみず',
    level: 'N1',
    short: '不顧〜',
    explain: '名詞＋をかえりみず。表示無視某事物。',
    examples: [
      { jp:'危険を顧みず助けに行った。', kana:'きけんをかえりみずたすけにいった。', romaji:'Kiken wo kaerimizu tasuke ni itta.', cn:'不顧危險前去救援。' }
    ]
  },
  {
    pattern: '〜を皮切りに',
    level: 'N1',
    short: '以〜為開端',
    explain: '名詞／た形＋のを皮切りに。表示某事開始後接連發生。',
    examples: [
      { jp:'東京公演を皮切りに、全国ツアーを開始する。', kana:'とうきょうこうえんをかわきりに、ぜんこくつあーをかいしする。', romaji:'Toukyou kouen wo kawakiri ni, zenkoku tsuaa wo kaishi suru.', cn:'以東京公演為開端，開始全國巡迴。' }
    ]
  },
  {
    pattern: '〜を限りに',
    level: 'N1',
    short: '以〜為限／用盡〜',
    explain: '名詞＋を限りに。① 從某時間點起改變 ② 用盡力量。',
    examples: [
      { jp:'今日を限りにタバコをやめる。', kana:'きょうをかぎりにたばこをやめる。', romaji:'Kyou wo kagiri ni tabako wo yameru.', cn:'從今天起戒菸。' }
    ]
  },
  {
    pattern: '〜を機に / 〜を契機に',
    level: 'N1',
    short: '以〜為契機',
    explain: '名詞＋を機に／を契機に。表示某事為起點。',
    examples: [
      { jp:'結婚を機に仕事を辞めた。', kana:'けっこんをきにしごとをやめた。', romaji:'Kekkon wo ki ni shigoto wo yameta.', cn:'以結婚為契機辭去工作。' }
    ]
  },
  {
    pattern: '〜をもって',
    level: 'N1',
    short: '以〜（書面）',
    explain: '名詞＋をもって。① 用某物為手段 ② 至某時間點為止（公告用語）。',
    examples: [
      { jp:'本日をもって閉店いたします。', kana:'ほんじつをもってへいてんいたします。', romaji:'Honjitsu wo motte heiten itashimasu.', cn:'本店今日結束營業。' }
    ]
  },
  {
    pattern: '〜を余儀なくされる',
    level: 'N1',
    short: '被迫〜',
    explain: '名詞＋を余儀なくされる。表示沒有選擇地接受某結果。',
    examples: [
      { jp:'天候不順により試合中止を余儀なくされた。', kana:'てんこうふじゅんによりしあいちゅうしをよぎなくされた。', romaji:'Tenkou fujun ni yori shiai chuushi wo yoginaku sareta.', cn:'因天候不佳被迫中止比賽。' }
    ]
  },
  {
    pattern: '〜をよそに',
    level: 'N1',
    short: '不顧〜',
    explain: '名詞＋をよそに。表示無視某事物的存在或反對。',
    examples: [
      { jp:'親の心配をよそに、彼は留学に出かけた。', kana:'おやのしんぱいをよそに、かれはりゅうがくにでかけた。', romaji:'Oya no shinpai wo yoso ni, kare wa ryuugaku ni dekaketa.', cn:'不顧父母擔心，他出國留學了。' }
    ]
  },
  {
    pattern: '〜んがため',
    level: 'N1',
    short: '為了〜（書面）',
    explain: 'ない形（去ない）＋んがため。書面語的「〜ために」。',
    examples: [
      { jp:'勝たんがため、必死に練習した。', kana:'かたんがため、ひっしにれんしゅうした。', romaji:'Katan ga tame, hisshi ni renshuu shita.', cn:'為了勝利拼命練習。' }
    ]
  },
  {
    pattern: '〜んばかり',
    level: 'N1',
    short: '幾乎要〜',
    explain: 'ない形（去ない）＋んばかり。表示幾乎達到某狀態。',
    examples: [
      { jp:'泣かんばかりの顔をしていた。', kana:'なかんばかりのかおをしていた。', romaji:'Nakan bakari no kao wo shite ita.', cn:'露出快要哭出來的表情。' }
    ]
  },
  {
    pattern: '〜ばそれまでだ',
    level: 'N1',
    short: '〜的話就完了',
    explain: 'ば形＋それまでだ。表示如果發生某事就無法挽回。',
    examples: [
      { jp:'こんな大事な書類、なくしたらそれまでだ。', kana:'こんなだいじなしょるい、なくしたらそれまでだ。', romaji:'Konna daiji na shorui, nakushitara sore made da.', cn:'這麼重要的文件，弄丟就完了。' }
    ]
  },
  {
    pattern: '〜こととて',
    level: 'N1',
    short: '因為〜（書面）',
    explain: '辭書形／い形／な形／名詞の＋こととて。書面語表示原因，常用於致歉。',
    examples: [
      { jp:'慣れぬこととてご迷惑をおかけしました。', kana:'なれぬこととてごめいわくをおかけしました。', romaji:'Narenu koto tote gomeiwaku wo okake shimashita.', cn:'因不熟練給您添麻煩了。' }
    ]
  },
  {
    pattern: '〜ことなしに',
    level: 'N1',
    short: '不〜就〜',
    explain: '辭書形＋ことなしに。書面，表示沒有做X就達不到Y。',
    examples: [
      { jp:'努力することなしに成功はない。', kana:'どりょくすることなしにせいこうはない。', romaji:'Doryoku suru koto nashi ni seikou wa nai.', cn:'沒有努力就沒有成功。' }
    ]
  },
  {
    pattern: '〜が最後',
    level: 'N1',
    short: '一旦〜就〜',
    explain: 'た形＋が最後。表示一旦發生某事就不可挽回。',
    examples: [
      { jp:'彼にその秘密を話したが最後、すぐに広まってしまう。', kana:'かれにそのひみつをはなしたがさいご、すぐにひろまってしまう。', romaji:'Kare ni sono himitsu wo hanashita ga saigo, sugu ni hiromatte shimau.', cn:'告訴他這個秘密之後就會立刻傳開。' }
    ]
  },
  {
    pattern: '〜が早いか',
    level: 'N1',
    short: '剛〜就〜',
    explain: '辭書形＋が早いか。表示前後動作緊接。',
    examples: [
      { jp:'家に着くが早いか、寝てしまった。', kana:'いえにつくがはやいか、ねてしまった。', romaji:'Ie ni tsuku ga hayai ka, nete shimatta.', cn:'剛到家就睡著了。' }
    ]
  },
  {
    pattern: '〜とはいえ',
    level: 'N1',
    short: '雖說〜但是',
    explain: '普通形／名詞＋とはいえ。書面語的逆接，「雖然事實如此，但是…」。',
    examples: [
      { jp:'プロとはいえ、ミスは避けられない。', kana:'ぷろとはいえ、みすはさけられない。', romaji:'Puro to wa ie, misu wa sakerarenai.', cn:'雖說是專業，也難免失誤。' }
    ]
  },
  {
    pattern: '〜とはいうものの',
    level: 'N1',
    short: '雖說〜',
    explain: '普通形＋とはいうものの。比「とはいえ」更口語自然。',
    examples: [
      { jp:'春とはいうものの、まだ寒い。', kana:'はるとはいうものの、まださむい。', romaji:'Haru to wa iu mono no, mada samui.', cn:'雖說是春天，還很冷。' }
    ]
  },
  {
    pattern: '〜にひきかえ',
    level: 'N1',
    short: '與〜相反',
    explain: '普通形／名詞の＋にひきかえ。書面語強烈對比。',
    examples: [
      { jp:'兄の真面目さにひきかえ、弟は怠け者だ。', kana:'あにのまじめさにひきかえ、おとうとはなまけものだ。', romaji:'Ani no majimesa ni hikikae, otouto wa namakemono da.', cn:'相對於哥哥的認真，弟弟很懶散。' }
    ]
  },
  {
    pattern: '〜にもまして',
    level: 'N1',
    short: '比〜更',
    explain: '名詞／疑問詞＋にもまして。表示「比某事物程度更高」。',
    examples: [
      { jp:'今年は何にもまして努力した一年だった。', kana:'ことしはなににもましてどりょくしたいちねんだった。', romaji:'Kotoshi wa nani ni mo mashite doryoku shita ichinen datta.', cn:'今年是最努力的一年。' }
    ]
  },
  {
    pattern: '〜とばかりに',
    level: 'N1',
    short: '彷彿〜似地',
    explain: '普通形／引用＋とばかりに。表示沒說但態度像在說。',
    examples: [
      { jp:'もう帰れとばかりに彼は時計を見た。', kana:'もうかえれとばかりにかれはとけいをみた。', romaji:'Mou kaere to bakari ni kare wa tokei wo mita.', cn:'他看了看時間，像是在說「該回去了」。' }
    ]
  },
  {
    pattern: '〜ともなると / 〜ともなれば',
    level: 'N1',
    short: '到了〜的程度就',
    explain: '名詞／辭書形＋ともなると／ともなれば。表示「到了某高的階段／程度，就會…」。',
    examples: [
      { jp:'社長ともなれば、責任も重い。', kana:'しゃちょうともなれば、せきにんもおもい。', romaji:'Shachou to mo nareba, sekinin mo omoi.', cn:'到了社長這個位子，責任也很重。' }
    ]
  },
  {
    pattern: '〜といえども',
    level: 'N1',
    short: '即使是〜也〜',
    explain: '普通形／名詞＋といえども。書面語的「即使是〜」。',
    examples: [
      { jp:'専門家といえども完璧ではない。', kana:'せんもんかといえどもかんぺきではない。', romaji:'Senmonka to iedomo kanpeki de wa nai.', cn:'即使是專家也不完美。' }
    ]
  },
  {
    pattern: '〜とまでは言わないが',
    level: 'N1',
    short: '雖然不到〜的地步',
    explain: '常體＋とまでは言わないが。表示退一步說。',
    examples: [
      { jp:'天才とまでは言わないが、優秀な人だ。', kana:'てんさいとまではいわないが、ゆうしゅうなひとだ。', romaji:'Tensai to made wa iwanai ga, yuushuu na hito da.', cn:'雖然不到天才，但是個優秀的人。' }
    ]
  },
  {
    pattern: '〜とは限らない',
    level: 'N1',
    short: '不一定〜',
    explain: '普通形＋とは限らない。表示否定一般觀念。',
    examples: [
      { jp:'高いものがいいとは限らない。', kana:'たかいものがいいとはかぎらない。', romaji:'Takai mono ga ii to wa kagiranai.', cn:'貴的不一定好。' }
    ]
  },
  {
    pattern: '〜であれ',
    level: 'N1',
    short: '即使是〜',
    explain: '名詞／疑問詞＋であれ。書面語「不論〜都〜」。',
    examples: [
      { jp:'どんな理由であれ、暴力はいけない。', kana:'どんなりゆうであれ、ぼうりょくはいけない。', romaji:'Donna riyuu de are, bouryoku wa ikenai.', cn:'不論什麼理由，暴力都不行。' }
    ]
  },
  {
    pattern: '〜であれ〜であれ',
    level: 'N1',
    short: '不論是〜或是〜',
    explain: '名詞×2＋であれ〜であれ。並列「不論〜」。',
    examples: [
      { jp:'雨であれ雪であれ、出かけるつもりだ。', kana:'あめであれゆきであれ、でかけるつもりだ。', romaji:'Ame de are yuki de are, dekakeru tsumori da.', cn:'不論下雨還是下雪都打算出門。' }
    ]
  },
  {
    pattern: '〜と相俟って',
    level: 'N1',
    short: '與〜相互結合',
    explain: '名詞＋と相俟って。書面語「與〜相互作用」。',
    examples: [
      { jp:'天候と相俟って絶景となった。', kana:'てんこうとあいまってぜっけいとなった。', romaji:'Tenkou to aimatte zekkei to natta.', cn:'與天氣相結合，成了絕景。' }
    ]
  },
  {
    pattern: '〜にして〜',
    level: 'N1',
    short: '到〜的程度才〜',
    explain: '名詞＋にして。書面語強調「到某程度才能達到」。',
    examples: [
      { jp:'彼にしてこの結果なら、誰にもできないだろう。', kana:'かれにしてこのけっかなら、だれにもできないだろう。', romaji:'Kare ni shite kono kekka nara, dare ni mo dekinai darou.', cn:'連他做到這樣，誰也辦不到吧。' }
    ]
  },
  {
    pattern: '〜ほどの',
    level: 'N1',
    short: '〜這種程度的',
    explain: '辭書形／い形／名詞＋ほどの＋名詞。表示某程度的事物。',
    examples: [
      { jp:'命をかけるほどの価値はない。', kana:'いのちをかけるほどのかちはない。', romaji:'Inochi wo kakeru hodo no kachi wa nai.', cn:'沒有值得拚命的價值。' }
    ]
  },
  {
    pattern: '〜ものとする',
    level: 'N1',
    short: '視為〜（法律／契約）',
    explain: '辭書形／ない形＋ものとする。書面正式語，定義條款。',
    examples: [
      { jp:'契約は両者の合意により成立するものとする。', kana:'けいやくはりょうしゃのごういによりせいりつするものとする。', romaji:'Keiyaku wa ryousha no goui ni yori seiritsu suru mono to suru.', cn:'契約以雙方合意而成立。' }
    ]
  },
  {
    pattern: '〜ものと思われる',
    level: 'N1',
    short: '可以認為〜（書面客觀推測）',
    explain: '普通形＋ものと思われる。書面語客觀推測。',
    examples: [
      { jp:'今後も成長するものと思われる。', kana:'こんごもせいちょうするものとおもわれる。', romaji:'Kongo mo seichou suru mono to omowareru.', cn:'可以認為今後也會持續成長。' }
    ]
  },
  {
    pattern: '〜やら〜やら',
    level: 'N1',
    short: '〜啦〜啦（雜亂列舉）',
    explain: '辭書形／い形／名詞＋やら×2。多帶煩亂語感。',
    examples: [
      { jp:'嬉しいやら恥ずかしいやら、複雑な気持ちだ。', kana:'うれしいやらはずかしいやら、ふくざつなきもちだ。', romaji:'Ureshii yara hazukashii yara, fukuzatsu na kimochi da.', cn:'又開心又害羞，心情很複雜。' }
    ]
  },
  {
    pattern: '〜つ〜つ',
    level: 'N1',
    short: '又〜又〜（書面）',
    explain: 'ます形（去ます）×2＋つ。書面語表示動作交替。',
    examples: [
      { jp:'追いつ追われつの大接戦だった。', kana:'おいつおわれつのだいせっせんだった。', romaji:'Oitsu owaretsu no daisessen datta.', cn:'你追我趕的激戰。' }
    ]
  },
  {
    pattern: '〜ともすると / 〜ともすれば',
    level: 'N1',
    short: '動不動就〜',
    explain: 'ともすると〜がち／ともすれば〜やすい。表示傾向。',
    examples: [
      { jp:'若い人はともすると感情的になりがちだ。', kana:'わかいひとはともするとかんじょうてきになりがちだ。', romaji:'Wakai hito wa tomosuru to kanjouteki ni nari gachi da.', cn:'年輕人動不動就會情緒化。' }
    ]
  },
  {
    pattern: '〜ばや',
    level: 'N1',
    short: '希望〜（古語感）',
    explain: 'ば形＋や。古典文學感的願望表達。',
    examples: [
      { jp:'もう一度、君に会えればや。', kana:'もういちど、きみにあえればや。', romaji:'Mou ichido, kimi ni aereba ya.', cn:'好希望能再見你一面。' }
    ]
  },
  {
    pattern: '〜ともなく',
    level: 'N1',
    short: '無意間〜',
    explain: '辭書形＋ともなく。表示沒特別意圖。',
    examples: [
      { jp:'見るともなく窓の外を眺めていた。', kana:'みるともなくまどのそとをながめていた。', romaji:'Miru to mo naku mado no soto wo nagamete ita.', cn:'漫不經心地望著窗外。' }
    ]
  },
  {
    pattern: '〜手前',
    level: 'N1',
    short: '在〜面前／因〜的緣故',
    explain: '辭書形／た形／名詞の＋手前。表示因為要顧面子或形象。',
    examples: [
      { jp:'引き受けた手前、最後までやらないと。', kana:'ひきうけたてまえ、さいごまでやらないと。', romaji:'Hikiuketa temae, saigo made yaranai to.', cn:'既然答應了，就得做到最後。' }
    ]
  },
  {
    pattern: '〜矢先に',
    level: 'N1',
    short: '正要〜的時候',
    explain: 'た形／辭書形＋矢先に。表示「正要做某事的當下」。',
    examples: [
      { jp:'出かけようとした矢先に電話が鳴った。', kana:'でかけようとしたやさきにでんわがなった。', romaji:'Dekakeyou to shita yasaki ni denwa ga natta.', cn:'正要出門時電話響了。' }
    ]
  },
  {
    pattern: '〜限りだ',
    level: 'N1',
    short: '非常〜的感情',
    explain: '感情形容詞／名詞＋限りだ。表達強烈感情。',
    examples: [
      { jp:'寂しい限りだ。', kana:'さびしいかぎりだ。', romaji:'Sabishii kagiri da.', cn:'非常寂寞。' }
    ]
  },
  {
    pattern: '〜と来たら',
    level: 'N1',
    short: '說到〜真是…',
    explain: '名詞＋と来たら。提起話題，常帶責備。',
    examples: [
      { jp:'うちの子と来たら、勉強しないで遊んでばかりだ。', kana:'うちのことと来たら、べんきょうしないであそんでばかりだ。', romaji:'Uchi no ko to kitara, benkyou shinaide asonde bakari da.', cn:'我家小孩說起來，整天只顧玩不讀書。' }
    ]
  },
  {
    pattern: '〜こそあれ',
    level: 'N1',
    short: '雖然有〜但〜',
    explain: '名詞／い形容詞語幹＋こそあれ。書面，表示讓步。',
    examples: [
      { jp:'多少の差こそあれ、結果は同じだ。', kana:'たしょうのさこそあれ、けっかはおなじだ。', romaji:'Tashou no sa koso are, kekka wa onaji da.', cn:'雖然有些差異，但結果一樣。' }
    ]
  },
  {
    pattern: '〜たところで',
    level: 'N1',
    short: '即使〜也〜',
    explain: 'た形＋ところで。「即使做了也沒用」。',
    examples: [
      { jp:'今さら走ったところで間に合わない。', kana:'いまさらはしったところでまにあわない。', romaji:'Imasara hashitta tokoro de maniawanai.', cn:'現在跑也來不及。' }
    ]
  },
  {
    pattern: '〜とあれば',
    level: 'N1',
    short: '如果是〜的話',
    explain: '名詞／普通形＋とあれば。表示「如果是這種特殊情況，當然〜」。',
    examples: [
      { jp:'子供のためとあれば、何でもする。', kana:'こどものためとあれば、なんでもする。', romaji:'Kodomo no tame to areba, nan demo suru.', cn:'如果是為了孩子，什麼都做。' }
    ]
  },
  {
    pattern: '〜にいたって',
    level: 'N1',
    short: '到了〜的地步',
    explain: '辭書形／た形／名詞＋に至って。表示到達極端狀況。',
    examples: [
      { jp:'倒産するに至って、ようやく問題に気付いた。', kana:'とうさんするにいたって、ようやくもんだいにきづいた。', romaji:'Tousan suru ni itatte, youyaku mondai ni kizuita.', cn:'到了倒閉的地步，才終於意識到問題。' }
    ]
  },
  {
    pattern: '〜ともあろう',
    level: 'N1',
    short: '身為〜竟然〜',
    explain: '名詞（職位／身份）＋ともあろう＋名詞。表示對某身份的人做的事感到驚訝或失望。',
    examples: [
      { jp:'警察官ともあろう者が違反するなんて。', kana:'けいさつかんともあろうものがいはんするなんて。', romaji:'Keisatsukan to mo arou mono ga ihan suru nante.', cn:'身為警察竟然違規。' }
    ]
  },
  {
    pattern: '〜にかたくない',
    level: 'N1',
    short: '不難〜',
    explain: '辭書形／名詞＋にかたくない。書面，「不難想像／推測」。',
    examples: [
      { jp:'彼の気持ちは想像にかたくない。', kana:'かれのきもちはそうぞうにかたくない。', romaji:'Kare no kimochi wa souzou ni katakunai.', cn:'他的心情不難想像。' }
    ]
  },
  {
    pattern: '〜の手前',
    level: 'N1',
    short: '為了顧及〜的面子',
    explain: '名詞の＋手前。表示要顧及某人觀感。',
    examples: [
      { jp:'人の手前、笑顔を作った。', kana:'ひとのてまえ、えがおをつくった。', romaji:'Hito no temae, egao wo tsukutta.', cn:'為了顧及別人，擠出笑容。' }
    ]
  },
  {
    pattern: '〜くらいなら〜ほうがましだ',
    level: 'N1',
    short: '與其〜不如〜',
    explain: '辭書形＋くらいなら＋辭書形／た形＋ほうがましだ。',
    examples: [
      { jp:'謝るくらいなら、最初から言わなければよかった。', kana:'あやまるくらいなら、さいしょからいわなければよかった。', romaji:'Ayamaru kurai nara, saisho kara iwanakereba yokatta.', cn:'與其道歉，不如一開始就不要說。' }
    ]
  },
  {
    pattern: '〜であれ〜であれ',
    level: 'N1',
    short: '不論是〜還是〜',
    explain: '名詞＋であれ×2。書面語列舉。',
    examples: [
      { jp:'大人であれ子供であれ、ルールを守るべきだ。', kana:'おとなであれこどもであれ、るーるをまもるべきだ。', romaji:'Otona de are kodomo de are, ruuru wo mamoru beki da.', cn:'不論大人小孩都該遵守規則。' }
    ]
  },
  {
    pattern: '〜なくしては',
    level: 'N1',
    short: '沒有〜就不能〜',
    explain: '名詞＋なくしては。「沒有前項就無法成立後項」。',
    examples: [
      { jp:'皆の協力なくしては成功できなかった。', kana:'みんなのきょうりょくなくしてはせいこうできなかった。', romaji:'Minna no kyouryoku nakushite wa seikou dekinakatta.', cn:'沒有大家的協助就不可能成功。' }
    ]
  }
];
