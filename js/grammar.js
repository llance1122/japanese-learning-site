// === N5 文法 (50+ 條) ===
// 結構：{ pattern, short, explain, examples: [{jp, kana, romaji, cn}] }

const GRAMMAR_DATA = [
  {
    pattern: '〜は〜です',
    short: 'A 是 B（最基本的肯定句）',
    explain: '助詞「は」用來提示句子的主題，「です」表示斷定，整個句型相當於中文的「A 是 B」。「は」當助詞時念作 wa，不是 ha。',
    examples: [
      { jp:'私は学生です。', kana:'わたしはがくせいです。', romaji:'Watashi wa gakusei desu.', cn:'我是學生。' },
      { jp:'これは本です。', kana:'これはほんです。', romaji:'Kore wa hon desu.', cn:'這是書。' }
    ]
  },
  {
    pattern: '〜じゃありません / 〜ではありません',
    short: '不是 B（です的否定）',
    explain: '「です」的否定型；「じゃ」是「では」的口語形。日常對話多用「じゃありません」，正式場合用「ではありません」。',
    examples: [
      { jp:'私は先生じゃありません。', kana:'わたしはせんせいじゃありません。', romaji:'Watashi wa sensei ja arimasen.', cn:'我不是老師。' },
      { jp:'これは私のではありません。', kana:'これはわたしのではありません。', romaji:'Kore wa watashi no de wa arimasen.', cn:'這不是我的。' }
    ]
  },
  {
    pattern: '〜は〜ですか',
    short: '疑問句（〜是〜嗎？）',
    explain: '在句尾加上「か」就變成疑問句。日文書寫不需要問號，但口語語尾要上揚。',
    examples: [
      { jp:'あなたは日本人ですか。', kana:'あなたはにほんじんですか。', romaji:'Anata wa nihonjin desu ka.', cn:'你是日本人嗎？' },
      { jp:'これは何ですか。', kana:'これはなんですか。', romaji:'Kore wa nan desu ka.', cn:'這是什麼？' }
    ]
  },
  {
    pattern: '〜も〜です',
    short: '〜也是〜',
    explain: '「も」表示「也」，取代「は」表示主題的相同性質。',
    examples: [
      { jp:'私も学生です。', kana:'わたしもがくせいです。', romaji:'Watashi mo gakusei desu.', cn:'我也是學生。' },
      { jp:'田中さんも日本人です。', kana:'たなかさんもにほんじんです。', romaji:'Tanaka-san mo nihonjin desu.', cn:'田中也是日本人。' }
    ]
  },
  {
    pattern: '名詞の名詞',
    short: '所屬／屬性的「的」',
    explain: '「の」連接兩個名詞，表示所屬、來源、種類等，相當於中文的「的」。',
    examples: [
      { jp:'私の本です。', kana:'わたしのほんです。', romaji:'Watashi no hon desu.', cn:'我的書。' },
      { jp:'日本語の先生です。', kana:'にほんごのせんせいです。', romaji:'Nihongo no sensei desu.', cn:'日語的老師。' }
    ]
  },
  {
    pattern: 'これ・それ・あれ',
    short: '指示代名詞（這個／那個／那個）',
    explain: 'これ＝離我近；それ＝離對方近；あれ＝離雙方都遠。「どれ」是疑問形「哪一個」。',
    examples: [
      { jp:'これは時計です。', kana:'これはとけいです。', romaji:'Kore wa tokei desu.', cn:'這是手錶。' },
      { jp:'あれは何ですか。', kana:'あれはなんですか。', romaji:'Are wa nan desu ka.', cn:'那是什麼？' }
    ]
  },
  {
    pattern: 'この・その・あの＋名詞',
    short: '連體詞「這個…／那個…」',
    explain: '修飾後面的名詞，後面一定要接名詞（不能單獨使用）。',
    examples: [
      { jp:'この本は面白いです。', kana:'このほんはおもしろいです。', romaji:'Kono hon wa omoshiroi desu.', cn:'這本書很有趣。' },
      { jp:'あの人は誰ですか。', kana:'あのひとはだれですか。', romaji:'Ano hito wa dare desu ka.', cn:'那個人是誰？' }
    ]
  },
  {
    pattern: '〜が〜（主格助詞）',
    short: '強調主語、新資訊',
    explain: '「が」標示主語，用來引入新資訊或回答疑問。「あります／います」「好き」「上手」前的主詞要用「が」。',
    examples: [
      { jp:'机の上に本があります。', kana:'つくえのうえにほんがあります。', romaji:'Tsukue no ue ni hon ga arimasu.', cn:'桌上有書。' },
      { jp:'私は猫が好きです。', kana:'わたしはねこがすきです。', romaji:'Watashi wa neko ga suki desu.', cn:'我喜歡貓。' }
    ]
  },
  {
    pattern: '〜を＋他動詞',
    short: '受詞助詞（把／將）',
    explain: '「を」標示動作的對象。實際發音與「お」相同，但寫成「を」。',
    examples: [
      { jp:'ご飯を食べます。', kana:'ごはんをたべます。', romaji:'Gohan wo tabemasu.', cn:'吃飯。' },
      { jp:'本を読みます。', kana:'ほんをよみます。', romaji:'Hon wo yomimasu.', cn:'讀書。' }
    ]
  },
  {
    pattern: '〜に（時間／到達點／對象）',
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
    short: '在／用',
    explain: '「で」用來表示動作發生的地點，或進行某動作的工具、手段。',
    examples: [
      { jp:'図書館で勉強します。', kana:'としょかんでべんきょうします。', romaji:'Toshokan de benkyou shimasu.', cn:'在圖書館學習。' },
      { jp:'バスで行きます。', kana:'ばすでいきます。', romaji:'Basu de ikimasu.', cn:'搭公車去。' }
    ]
  },
  {
    pattern: '〜へ（方向）',
    short: '前往的方向',
    explain: '表示動作前進的方向，後接移動動詞。發音為 e，不是 he。可與「に」互換，但「へ」更強調方向。',
    examples: [
      { jp:'日本へ行きます。', kana:'にほんへいきます。', romaji:'Nihon e ikimasu.', cn:'去日本。' },
      { jp:'家へ帰ります。', kana:'いえへかえります。', romaji:'Ie e kaerimasu.', cn:'回家。' }
    ]
  },
  {
    pattern: '〜と（共同／並列）',
    short: '和／與',
    explain: '① 表示共同進行動作的對象 ② 並列名詞時相當於「和」（完全列舉）。',
    examples: [
      { jp:'友達と映画を見ます。', kana:'ともだちとえいがをみます。', romaji:'Tomodachi to eiga wo mimasu.', cn:'和朋友看電影。' },
      { jp:'本と鉛筆があります。', kana:'ほんとえんぴつがあります。', romaji:'Hon to enpitsu ga arimasu.', cn:'有書和鉛筆。' }
    ]
  },
  {
    pattern: '〜から〜まで',
    short: '從〜到〜（時間／場所）',
    explain: '「から」表示起點，「まで」表示終點。時間和地點皆可使用。',
    examples: [
      { jp:'9時から5時まで働きます。', kana:'くじからごじまではたらきます。', romaji:'Ku-ji kara go-ji made hatarakimasu.', cn:'從九點工作到五點。' },
      { jp:'家から学校まで歩きます。', kana:'いえからがっこうまであるきます。', romaji:'Ie kara gakkou made arukimasu.', cn:'從家走到學校。' }
    ]
  },
  {
    pattern: '〜や〜など',
    short: '舉例（部分列舉）',
    explain: '「や」並列名詞，表示部分列舉（其它還有），常與「など」（等等）一起用。',
    examples: [
      { jp:'机の上に本やノートなどがあります。', kana:'つくえのうえにほんやのーとなどがあります。', romaji:'Tsukue no ue ni hon ya nooto nado ga arimasu.', cn:'桌上有書和筆記本等等。' }
    ]
  },
  {
    pattern: 'い形容詞＋名詞',
    short: 'い形容詞修飾名詞',
    explain: 'い形容詞直接接名詞，不需要任何助詞。',
    examples: [
      { jp:'高い山。', kana:'たかいやま。', romaji:'Takai yama.', cn:'高山。' },
      { jp:'美味しい料理。', kana:'おいしいりょうり。', romaji:'Oishii ryouri.', cn:'好吃的料理。' }
    ]
  },
  {
    pattern: 'な形容詞＋な＋名詞',
    short: 'な形容詞修飾名詞',
    explain: 'な形容詞接名詞時要加上「な」。',
    examples: [
      { jp:'静かな部屋。', kana:'しずかなへや。', romaji:'Shizuka na heya.', cn:'安靜的房間。' },
      { jp:'有名な人。', kana:'ゆうめいなひと。', romaji:'Yuumei na hito.', cn:'有名的人。' }
    ]
  },
  {
    pattern: 'い形容詞的活用（〜くないです／〜かったです）',
    short: 'い形容詞的否定與過去',
    explain: '否定：去掉い加くないです。過去：去掉い加かったです。過去否定：くなかったです。例外：いい→よくない／よかった。',
    examples: [
      { jp:'高くないです。', kana:'たかくないです。', romaji:'Takakunai desu.', cn:'不貴。' },
      { jp:'楽しかったです。', kana:'たのしかったです。', romaji:'Tanoshikatta desu.', cn:'(過去)很開心。' }
    ]
  },
  {
    pattern: 'な形容詞的活用（〜じゃないです／〜でした）',
    short: 'な形容詞的否定與過去',
    explain: '否定：〜じゃないです（じゃありません）。過去：〜でした。過去否定：じゃなかったです（じゃありませんでした）。',
    examples: [
      { jp:'元気じゃないです。', kana:'げんきじゃないです。', romaji:'Genki ja nai desu.', cn:'沒有精神。' },
      { jp:'有名でした。', kana:'ゆうめいでした。', romaji:'Yuumei deshita.', cn:'(過去)很有名。' }
    ]
  },
  {
    pattern: '動詞ます形',
    short: '動詞的禮貌肯定',
    explain: '表示禮貌、現在或未來的習慣性動作。基本句型：〜を／〜に＋動詞ます。',
    examples: [
      { jp:'毎日コーヒーを飲みます。', kana:'まいにちこーひーをのみます。', romaji:'Mainichi koohii wo nomimasu.', cn:'每天喝咖啡。' },
      { jp:'明日学校へ行きます。', kana:'あしたがっこうへいきます。', romaji:'Ashita gakkou e ikimasu.', cn:'明天去學校。' }
    ]
  },
  {
    pattern: '動詞ません',
    short: '動詞的禮貌否定（現在）',
    explain: '把「ます」改成「ません」，表示不做、不會做。',
    examples: [
      { jp:'お酒を飲みません。', kana:'おさけをのみません。', romaji:'Osake wo nomimasen.', cn:'不喝酒。' },
      { jp:'肉を食べません。', kana:'にくをたべません。', romaji:'Niku wo tabemasen.', cn:'不吃肉。' }
    ]
  },
  {
    pattern: '動詞ました',
    short: '動詞的禮貌過去（肯定）',
    explain: '把「ます」改成「ました」，表示過去做了。',
    examples: [
      { jp:'昨日映画を見ました。', kana:'きのうえいがをみました。', romaji:'Kinou eiga wo mimashita.', cn:'昨天看了電影。' }
    ]
  },
  {
    pattern: '動詞ませんでした',
    short: '動詞的禮貌過去（否定）',
    explain: '過去沒做的禮貌否定形。',
    examples: [
      { jp:'昨日勉強しませんでした。', kana:'きのうべんきょうしませんでした。', romaji:'Kinou benkyou shimasen deshita.', cn:'昨天沒有讀書。' }
    ]
  },
  {
    pattern: '〜ませんか',
    short: '邀請（要不要…？）',
    explain: '禮貌地邀請對方一起做某事，相當於「要不要…？」',
    examples: [
      { jp:'一緒にご飯を食べませんか。', kana:'いっしょにごはんをたべませんか。', romaji:'Issho ni gohan wo tabemasen ka.', cn:'要不要一起吃飯？' }
    ]
  },
  {
    pattern: '〜ましょう / 〜ましょうか',
    short: '邀約／提議（一起…吧）',
    explain: '「〜ましょう」表示「一起做…吧」；「〜ましょうか」較委婉，徵詢對方意見。',
    examples: [
      { jp:'行きましょう。', kana:'いきましょう。', romaji:'Ikimashou.', cn:'走吧／一起去吧。' },
      { jp:'手伝いましょうか。', kana:'てつだいましょうか。', romaji:'Tetsudaimashou ka.', cn:'我來幫忙好嗎？' }
    ]
  },
  {
    pattern: '動詞て形',
    short: '動詞中止形（連接用）',
    explain: 'て形是日語動詞的中介形，連接句子或變化成各種文法。例：食べる→食べて、行く→行って、する→して、来る→来て。',
    examples: [
      { jp:'起きて、顔を洗います。', kana:'おきて、かおをあらいます。', romaji:'Okite, kao wo araimasu.', cn:'起床然後洗臉。' }
    ]
  },
  {
    pattern: '〜ています',
    short: '正在進行／持續狀態',
    explain: '① 動作正在進行 ② 持續狀態（住んでいます／結婚しています）',
    examples: [
      { jp:'今ご飯を食べています。', kana:'いまごはんをたべています。', romaji:'Ima gohan wo tabete imasu.', cn:'正在吃飯。' },
      { jp:'東京に住んでいます。', kana:'とうきょうにすんでいます。', romaji:'Toukyou ni sunde imasu.', cn:'住在東京。' }
    ]
  },
  {
    pattern: '〜てください',
    short: '請（做某事）',
    explain: '禮貌地請求對方做某動作。',
    examples: [
      { jp:'ちょっと待ってください。', kana:'ちょっとまってください。', romaji:'Chotto matte kudasai.', cn:'請稍等一下。' },
      { jp:'もう一度言ってください。', kana:'もういちどいってください。', romaji:'Mou ichido itte kudasai.', cn:'請再說一次。' }
    ]
  },
  {
    pattern: '〜てもいいです',
    short: '允許（可以…）',
    explain: '徵求或給予許可。疑問形「〜てもいいですか」是「可以…嗎？」',
    examples: [
      { jp:'写真を撮ってもいいですか。', kana:'しゃしんをとってもいいですか。', romaji:'Shashin wo totte mo ii desu ka.', cn:'可以拍照嗎？' }
    ]
  },
  {
    pattern: '〜てはいけません',
    short: '禁止（不可以…）',
    explain: '表示禁止某行為。較口語可說「〜ちゃいけません」。',
    examples: [
      { jp:'ここでタバコを吸ってはいけません。', kana:'ここでたばこをすってはいけません。', romaji:'Koko de tabako wo sutte wa ikemasen.', cn:'這裡不可以抽菸。' }
    ]
  },
  {
    pattern: '〜なければなりません',
    short: '必須（非…不可）',
    explain: '表示義務或必要性，「不…不行」。簡略形：〜なきゃ／〜ないと。',
    examples: [
      { jp:'明日早く起きなければなりません。', kana:'あしたはやくおきなければなりません。', romaji:'Ashita hayaku okinakereba narimasen.', cn:'明天必須早起。' }
    ]
  },
  {
    pattern: '〜なくてもいいです',
    short: '不必（不用做也可以）',
    explain: '表示沒有必要做某事。',
    examples: [
      { jp:'明日来なくてもいいです。', kana:'あしたこなくてもいいです。', romaji:'Ashita konakute mo ii desu.', cn:'明天不來也沒關係。' }
    ]
  },
  {
    pattern: '〜たいです',
    short: '想要做（第一人稱）',
    explain: '動詞ます形去ます加上たい。表達自己的願望。對方則用「〜たがっています」。',
    examples: [
      { jp:'日本へ行きたいです。', kana:'にほんへいきたいです。', romaji:'Nihon e ikitai desu.', cn:'我想去日本。' },
      { jp:'寿司を食べたいです。', kana:'すしをたべたいです。', romaji:'Sushi wo tabetai desu.', cn:'我想吃壽司。' }
    ]
  },
  {
    pattern: '〜が欲しいです',
    short: '想要（某個東西）',
    explain: '表示想要某物。對象用「が」標示，否定為「欲しくないです」。',
    examples: [
      { jp:'新しい車が欲しいです。', kana:'あたらしいくるまがほしいです。', romaji:'Atarashii kuruma ga hoshii desu.', cn:'想要新車。' }
    ]
  },
  {
    pattern: '動詞辭書形（普通形）',
    short: '常體現在肯定',
    explain: '即動詞原形（書く、食べる、する、来る…），用於朋友、日記、各種句型基底。',
    examples: [
      { jp:'毎日本を読む。', kana:'まいにちほんをよむ。', romaji:'Mainichi hon wo yomu.', cn:'每天看書。' }
    ]
  },
  {
    pattern: '〜ない形',
    short: '常體現在否定',
    explain: '動詞普通形的否定。一類動詞 u→a＋ない（書く→書かない），二類去る加ない（食べる→食べない），する→しない、来る→こない。',
    examples: [
      { jp:'今日は学校へ行かない。', kana:'きょうはがっこうへいかない。', romaji:'Kyou wa gakkou e ikanai.', cn:'今天不去學校。' }
    ]
  },
  {
    pattern: '〜た形',
    short: '常體過去肯定',
    explain: 'て形把「て」換成「た」就是た形。表示過去做了某事，也是各種句型的基底（〜たことがある等）。',
    examples: [
      { jp:'昨日寿司を食べた。', kana:'きのうすしをたべた。', romaji:'Kinou sushi wo tabeta.', cn:'昨天吃了壽司。' }
    ]
  },
  {
    pattern: '〜ことができます',
    short: '能夠／會（做某事）',
    explain: '辭書形＋ことができます。表示能力或可能。也可用「動詞可能形」。',
    examples: [
      { jp:'日本語を話すことができます。', kana:'にほんごをはなすことができます。', romaji:'Nihongo wo hanasu koto ga dekimasu.', cn:'會說日語。' }
    ]
  },
  {
    pattern: '〜のが好きです / 〜のが上手です',
    short: '喜歡做／擅長做',
    explain: '辭書形＋のが好き／上手／下手。',
    examples: [
      { jp:'歌を歌うのが好きです。', kana:'うたをうたうのがすきです。', romaji:'Uta wo utau no ga suki desu.', cn:'喜歡唱歌。' }
    ]
  },
  {
    pattern: '〜前に / 〜あとで',
    short: '在…之前／之後',
    explain: '辭書形＋前に＝在…之前；た形＋あとで＝…之後。名詞接的話則是「名詞＋の前に／のあとで」。',
    examples: [
      { jp:'食べる前に手を洗います。', kana:'たべるまえにてをあらいます。', romaji:'Taberu mae ni te wo araimasu.', cn:'吃飯前洗手。' },
      { jp:'仕事のあとで映画を見ます。', kana:'しごとのあとでえいがをみます。', romaji:'Shigoto no ato de eiga wo mimasu.', cn:'下班後看電影。' }
    ]
  },
  {
    pattern: '〜時（とき）',
    short: '〜的時候',
    explain: '辭書形／た形／い形容詞／な形容詞（な）／名詞＋の＋時。表示某動作或狀態進行的時間點。',
    examples: [
      { jp:'子供の時、よく泳ぎました。', kana:'こどものとき、よくおよぎました。', romaji:'Kodomo no toki, yoku oyogimashita.', cn:'小時候常常游泳。' }
    ]
  },
  {
    pattern: '〜から（理由）',
    short: '因為〜',
    explain: '常體或禮貌體＋から，表示理由或原因，用於主觀的解釋。',
    examples: [
      { jp:'寒いから、コートを着ます。', kana:'さむいから、こーとをきます。', romaji:'Samui kara, kooto wo kimasu.', cn:'因為很冷，所以穿外套。' }
    ]
  },
  {
    pattern: '〜が、（逆接）',
    short: '雖然…但是',
    explain: '在句中作為轉折，比「でも／しかし」更柔和。前句後句以「が、」連接。',
    examples: [
      { jp:'日本語は難しいですが、面白いです。', kana:'にほんごはむずかしいですが、おもしろいです。', romaji:'Nihongo wa muzukashii desu ga, omoshiroi desu.', cn:'日語雖然難，但是有趣。' }
    ]
  },
  {
    pattern: '〜でしょう',
    short: '推測（…吧）',
    explain: '表示說話者的推測或徵求對方同意，比「です」更帶有不確定意味。',
    examples: [
      { jp:'明日は雨でしょう。', kana:'あしたはあめでしょう。', romaji:'Ashita wa ame deshou.', cn:'明天會下雨吧。' }
    ]
  },
  {
    pattern: '〜と思います',
    short: '我認為…',
    explain: '常體＋と思います，表示主觀的想法或意見。',
    examples: [
      { jp:'彼は来ると思います。', kana:'かれはくるとおもいます。', romaji:'Kare wa kuru to omoimasu.', cn:'我認為他會來。' }
    ]
  },
  {
    pattern: '〜と言いました / 〜と言っていました',
    short: '〜說了…',
    explain: '引用別人的話。直接引用用「」，間接引用用常體＋と言いました。',
    examples: [
      { jp:'田中さんは「はい」と言いました。', kana:'たなかさんは「はい」といいました。', romaji:'Tanaka-san wa "hai" to iimashita.', cn:'田中說「是」。' },
      { jp:'彼は明日来ると言っていました。', kana:'かれはあしたくるといっていました。', romaji:'Kare wa ashita kuru to itte imashita.', cn:'他說明天會來。' }
    ]
  },
  {
    pattern: '助數詞（一つ・一人・一個…）',
    short: '量詞（東西、人、物品）',
    explain: '日語量詞需根據對象選擇：人＝人（にん／り），東西＝つ／個（こ），動物＝匹（ひき），紙＝枚（まい），書＝冊（さつ），機器＝台（だい），長條物＝本（ほん）。',
    examples: [
      { jp:'りんごを三つください。', kana:'りんごをみっつください。', romaji:'Ringo wo mittsu kudasai.', cn:'請給我三顆蘋果。' },
      { jp:'切手を二枚買いました。', kana:'きってをにまいかいました。', romaji:'Kitte wo ni-mai kaimashita.', cn:'買了兩張郵票。' }
    ]
  },
  {
    pattern: '〜より〜のほうが',
    short: '比較（A 比 B 更…）',
    explain: '「Aより Bのほうが〜」＝B 比 A 更〜。',
    examples: [
      { jp:'バスより電車のほうが速いです。', kana:'ばすよりでんしゃのほうがはやいです。', romaji:'Basu yori densha no hou ga hayai desu.', cn:'電車比公車快。' }
    ]
  },
  {
    pattern: '〜の中で〜が一番〜',
    short: '最高級（在…之中最…）',
    explain: '表示在某範圍內最…。「中」可以替換成具體名詞。',
    examples: [
      { jp:'果物の中でりんごが一番好きです。', kana:'くだもののなかでりんごがいちばんすきです。', romaji:'Kudamono no naka de ringo ga ichiban suki desu.', cn:'水果中最喜歡蘋果。' }
    ]
  },
  {
    pattern: 'もう / まだ',
    short: '已經 / 還沒',
    explain: '「もう＋過去」＝已經…了；「まだ＋否定」＝還沒…。',
    examples: [
      { jp:'もう食べました。', kana:'もうたべました。', romaji:'Mou tabemashita.', cn:'已經吃了。' },
      { jp:'まだ食べていません。', kana:'まだたべていません。', romaji:'Mada tabete imasen.', cn:'還沒吃。' }
    ]
  },
  {
    pattern: '〜だけ',
    short: '只（限定）',
    explain: '表示限定的數量、範圍或對象，用法較中性。',
    examples: [
      { jp:'水だけ飲みます。', kana:'みずだけのみます。', romaji:'Mizu dake nomimasu.', cn:'只喝水。' }
    ]
  },
  {
    pattern: '〜しか〜ない',
    short: '只…（強調少／不足）',
    explain: '與「だけ」不同，「しか」後面必接否定，帶有「僅有這些、不足」的語氣。',
    examples: [
      { jp:'百円しかありません。', kana:'ひゃくえんしかありません。', romaji:'Hyaku-en shika arimasen.', cn:'只有一百日圓而已。' }
    ]
  },
  {
    pattern: 'あります / います',
    short: '存在動詞（在／有）',
    explain: '無生命物用「あります」，有生命物（人、動物）用「います」。場所助詞用「に」。',
    examples: [
      { jp:'机の上に本があります。', kana:'つくえのうえにほんがあります。', romaji:'Tsukue no ue ni hon ga arimasu.', cn:'桌上有書。' },
      { jp:'庭に犬がいます。', kana:'にわにいぬがいます。', romaji:'Niwa ni inu ga imasu.', cn:'院子裡有狗。' }
    ]
  }
];
