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
  }
];
