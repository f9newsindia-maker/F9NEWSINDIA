import { NewsArticle, NewsVideo, AdBanner, UserProfile } from '../types/news';

export const INITIAL_BREAKING_NEWS: string[] = [
  'F9NEWSINDIA: महाराष्ट्र और उत्तर प्रदेश में विकास परियोजनाओं को मिली बड़ी मंजूरी।',
  'सुप्रीम कोर्ट का ऐतिहासिक फैसला: नागरिकों के डिजिटल अधिकारों पर बड़ा दिशा-निर्देश।',
  'भारतीय शेयर बाजार में रिकॉर्ड तेजी: सेंसेक्स और निफ्टी नए ऑल-टाइम हाई पर।',
  'मौसम विभाग की चेतावनी: उत्तर भारत में अगले 48 घंटों में भारी बारिश का अलर्ट जारी।',
  'क्रिकेट: टीम इंडिया ने रोमांचक मुकाबले में दर्ज की ऐतिहासिक जीत, कप्तान चमके।',
];

export const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'f9-art-101',
    title: 'महाराष्ट्र में इंफ्रास्ट्रक्चर क्रांति: मुंबई-पुणे और नागपुर समृद्धि एक्सप्रेसवे से जुड़ेंगे नए औद्योगिक क्लस्टर',
    summary: 'महाराष्ट्र सरकार ने राज्य के 8 प्रमुख जिलों को सीधे एक्सप्रेसवे नेटवर्क से जोड़ने का ऐतिहासिक निर्णय लिया है।',
    content: `मुंबई: महाराष्ट्र में कनेक्टिविटी और औद्योगिक विकास को नया पंख देने के लिए राज्य कैबिनेट ने महत्वाकांक्षी कार्ययोजना को मंजूरी दी है। इस योजना के तहत नागपुर-मुंबई समृद्धि महामार्ग और मुंबई-पुणे एक्सप्रेसवे से लगे क्षेत्रों में उच्च-तकनीकी विनिर्माण हब स्थापित किए जाएंगे।

उद्योग मंत्री ने बताया कि इस कदम से राज्य के 1 लाख से अधिक स्थानीय युवाओं को सीधे रोजगार के अवसर प्राप्त होंगे। साथ ही विदर्भ, मराठवाड़ा और पश्चिमी महाराष्ट्र के कृषि उत्पादों को सीधे जेएनपीटी बंदरगाह तक 6 से 8 घंटे में पहुँचाया जा सकेगा।

स्थानीय चैंबर ऑफ कॉमर्स ने इस फैसले का स्वागत किया है और इसे विकास का नया रोडमैप बताया है।`,
    category: 'महाराष्ट्र',
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-28T05:30:00Z',
    reporterName: 'राजेश सावंत (F9 विशेष संवाददाता)',
    reporterId: 'rep-mh-01',
    location: 'मुंबई, महाराष्ट्र',
    views: 14820,
    likes: 840,
    shares: 320,
    isBreaking: true,
    isTrending: true,
    isFeatured: true,
    tags: ['महाराष्ट्र', 'मुंबई', 'समृद्धि महामार्ग', 'रोजगार', 'विकास'],
    status: 'published',
    comments: [
      {
        id: 'c-1',
        userName: 'संजय कुलकर्णी',
        text: 'विदर्भ के किसानों और युवाओं के लिए यह बहुत ही सराहनीय कदम है। F9NEWS का कवरेज सटीक है।',
        timestamp: '1 घंटे पहले',
        likes: 18,
      },
      {
        id: 'c-2',
        userName: 'अमित पाटिल',
        text: 'परियोजना को समय पर पूरा किया जाना बेहद जरूरी है।',
        timestamp: '35 मिनट पहले',
        likes: 7,
      },
    ],
  },
  {
    id: 'f9-art-102',
    title: 'उत्तर प्रदेश: नोएडा इंटरनेशनल एयरपोर्ट से पहली वाणिज्यिक उड़ानों का सफल ट्रायल, NCR को मिली नई रफ़्तार',
    summary: 'जेवर में निर्मित नोएडा अंतरराष्ट्रीय हवाई अड्डे पर सभी सुरक्षा और तकनीकी परीक्षण सफलतापूर्वक पूरे कर लिए गए हैं।',
    content: `लखनऊ/ग्रेटर नोएडा: देश के सबसे बड़े ग्रीनफील्ड हवाई अड्डों में शुमार नोएडा इंटरनेशनल एयरपोर्ट (जेवर) ने व्यावसायिक परिचालन की दिशा में एक और बड़ा मील का पत्थर हासिल कर लिया है। नागर विमानन महानिदेशालय (DGCA) की निगरानी में बोइंग 737 और एयरबस A320 विमानों का सफल रनवे और नेविगेशन ट्रायल संपन्न हुआ।

नागर विमानन अधिकारियों के मुताबिक, टर्मिनल बिल्डिंग पूरी तरह से भारतीय संस्कृति और अत्याधुनिक डिजिटलीकरण का संगम है। यह एयरपोर्ट न केवल पश्चिमी उत्तर प्रदेश बल्कि पूरे राष्ट्रीय राजधानी क्षेत्र के व्यापार और पर्यटन को बढ़ावा देगा।

मुख्यमंत्री कार्यालय ने इसे नए भारत के आधुनिक उत्तर प्रदेश का प्रतीक बताया है।`,
    category: 'उत्तर प्रदेश',
    imageUrl: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-28T04:45:00Z',
    reporterName: 'अखिलेश त्रिपाठी (F9 ब्यूरो चीफ)',
    reporterId: 'rep-up-02',
    location: 'लखनऊ, उत्तर प्रदेश',
    views: 19450,
    likes: 1240,
    shares: 512,
    isBreaking: true,
    isTrending: true,
    isFeatured: true,
    tags: ['उत्तर प्रदेश', 'जेवर एयरपोर्ट', 'नोएडा', 'लखनऊ', 'DGCA'],
    status: 'published',
    comments: [
      {
        id: 'c-3',
        userName: 'आलोक श्रीवास्तव',
        text: 'उत्तर प्रदेश में इंफ्रास्ट्रक्चर के विकास की गति वाकई अद्भूत है।',
        timestamp: '2 घंटे पहले',
        likes: 24,
      },
    ],
  },
  {
    id: 'f9-art-103',
    title: 'देश: डिजिटल इंडिया 3.0 का शुभारंभ, दूरदराज के 1 लाख गांवों को मिलेगी सुपरफ़ास्ट 5G ब्रॉडबैंड कनेक्टिविटी',
    summary: 'केंद्रीय संचार मंत्रालय ने ग्राम पंचायतों तक हाई-स्पीड इंटरनेट पहुँचाने के लिए नए ऑप्टिकल फाइबर प्रोजेक्ट को हरी झंडी दी।',
    content: `नई दिल्ली: भारत सरकार ने डिजिटल समावेशन को अंतिम व्यक्ति तक पहुँचाने के उद्देश्य से 'डिजिटल ग्राम क्रांति' की औपचारिक शुरुआत की है। इस परियोजना के अंतर्गत पहाड़ी, पूर्वोत्तर और जनजातीय बहुल क्षेत्रों की ग्राम पंचायतों में सीधे हाई-स्पीड कनेक्टिविटी मुहैया कराई जाएगी।

योजना के तहत ग्राम पंचायत भवनों, स्वास्थ्य केंद्रों और प्राथमिक विद्यालयों में मुफ्त वाई-फाई जोन बनाए जाएंगे, जिससे छात्र ऑनलाइन शिक्षा और टेलीमेडिसिन सेवाओं का लाभ उठा सकें।

केंद्रीय मंत्री ने संसद में बताया कि डिजिटल भारत अब केवल महानगरों तक सीमित नहीं रहेगा, बल्कि गांव का किसान भी सीधे मंडी भाव और मौसम का पूर्वानुमान रियल-टाइम में पा सकेगा।`,
    category: 'देश',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-28T03:15:00Z',
    reporterName: 'सुनील शर्मा (F9 राष्ट्रीय ब्यूरो)',
    location: 'नई दिल्ली',
    views: 11200,
    likes: 670,
    shares: 210,
    isTrending: true,
    tags: ['देश', 'डिजिटल इंडिया', '5G', 'टेलीकॉम', 'ग्रामीण विकास'],
    status: 'published',
    comments: [],
  },
  {
    id: 'f9-art-104',
    title: 'राजनीति: आगामी विधानसभा चुनावों को लेकर सियासी हलचल तेज, प्रमुख दलों ने कसी कमर',
    summary: 'चुनावी राज्यों में सीटों के बंटवारे और उम्मीदवारों की पहली सूची पर शीर्ष नेतृत्व की मैराथन बैठकें जारी।',
    content: `नई दिल्ली: राज्यों में होने वाले महत्वपूर्ण विधानसभा चुनावों से पहले राजनीतिक सरगर्मियां चरम पर पहुँच गई हैं। सत्ता पक्ष और विपक्ष दोनों ही गठबंधन सहयोगियों के साथ सीट शेयरिंग फॉर्मूले को अंतिम रूप देने में जुटे हैं।

सूत्रों के अनुसार, युवाओं और जमीनी कार्यकर्ताओं को इस बार टिकट वितरण में प्राथमिकता दी जा सकती है। राजनीतिक विश्लेषकों का मानना है कि स्थानीय मुद्दे और कल्याणकारी योजनाओं का प्रभाव चुनाव नतीजों में निर्णायक साबित होगा।

F9NEWSINDIA अपने विशेष कार्यक्रम 'जनता का फैसला' के तहत ग्राउंड ज़ीरो से मतदाताओं का सीधा मूड दिखाएगा।`,
    category: 'राजनीति',
    imageUrl: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-28T02:00:00Z',
    reporterName: 'प्रियंका वर्मा (F9 विशेष संवाददाता)',
    location: 'नई दिल्ली',
    views: 8900,
    likes: 430,
    shares: 115,
    tags: ['राजनीति', 'चुनाव', 'सियासत', 'संसद'],
    status: 'published',
    comments: [],
  },
  {
    id: 'f9-art-105',
    title: 'अपराध: मुंबई और पुणे में फर्जी निवेश ऐप चलाने वाले अंतरराष्ट्रीय साइबर गिरोह का भंडाफोड़, 12 गिरफ्तार',
    summary: 'साइबर पुलिस ने त्वरित कार्रवाई करते हुए आम नागरिकों के करोड़ों रुपये ठगने वाले हाई-टेक सिंडिकेट को पकड़ा।',
    content: `मुंबई: महाराष्ट्र साइबर सेल ने एक बड़ी कार्रवाई करते हुए फर्जी ट्रेडिंग और डिजिटल अरेस्ट के नाम पर भोले-भाले लोगों को चूना लगाने वाले गिरोह के 12 शातिरों को दबोच लिया है। आरोपियों के पास से 45 स्मार्टफ़ोन, 15 लैपटॉप, 150 से ज्यादा फर्जी बैंक पासबुक और 85 लाख रुपये की नकदी बरामद की गई है।

पुलिस कमिश्नर ने जनता से अपील की है कि किसी भी अनजान लिंक या अनजान कॉलर द्वारा खुद को पुलिस या सीबीआई अधिकारी बताकर पैसे ट्रांसफर करने का दबाव बनाए जाने पर तुरंत साइबर हेल्पलाइन 1930 पर शिकायत दर्ज कराएं।`,
    category: 'अपराध',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-27T22:30:00Z',
    reporterName: 'विक्रम सावंत (F9 क्राइम डेस्क)',
    location: 'मुंबई, महाराष्ट्र',
    views: 16750,
    likes: 910,
    shares: 640,
    isBreaking: true,
    tags: ['अपराध', 'साइबर क्राइम', 'मुंबई पुलिस', 'अलर्ट'],
    status: 'published',
    comments: [],
  },
  {
    id: 'f9-art-106',
    title: 'खेल: भारतीय क्रिकेट टीम की एकतरफा जीत, युवा बल्लेबाज ने ठोका तूफानी शतक',
    summary: 'शानदार गेंदबाजी और आक्रामक बल्लेबाजी के दम पर भारत ने प्रतिद्वंद्वी टीम को 9 विकेट से रौंदकर सीरीज पर जमाया कब्जा।',
    content: `वानखेड़े स्टेडियम, मुंबई: भारतीय टीम ने घरेलू मैदान पर अपनी बादशाहत को एक बार फिर साबित कर दिया है। 240 रनों के लक्ष्य का पीछा करते हुए सलामी जोड़ी ने विस्फोटक शुरुआत की और बिना किसी दबाव के 34 ओवर में ही लक्ष्य हासिल कर लिया।

युवा सलामी बल्लेबाज ने मात्र 72 गेंदों में 11 चौकों और 6 छक्कों की मदद से नाबाद 114 रनों की पारी खेलकर मैन ऑफ द मैच का पुरस्कार जीता। कप्तान ने मैच के बाद कहा कि टीम की फील्डिंग और ऊर्जा जीत की मुख्य वजह रही।`,
    category: 'खेल',
    imageUrl: 'https://images.unsplash.com/photo-1531415074868-036b107e7752?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-27T20:00:00Z',
    reporterName: 'रोहित जोशी (F9 स्पोर्ट्स डेस्क)',
    location: 'मुंबई',
    views: 22400,
    likes: 2150,
    shares: 890,
    isTrending: true,
    tags: ['खेल', 'क्रिकेट', 'टीम इंडिया', 'वानखेड़े'],
    status: 'published',
    comments: [],
  },
  {
    id: 'f9-art-107',
    title: 'बिजनेस: शेयर बाजार में बहार, सेंसेक्स 85,000 के ऐतिहासिक स्तर को पार कर नए शिखर पर',
    summary: 'विदेशी संस्थागत निवेशकों (FII) की भारी खरीदारी और ऑटो-आईटी सेक्टर में उछाल से निवेशकों की संपत्ति में 4 लाख करोड़ का इजाफा।',
    content: `दलाल स्ट्रीट, मुंबई: घरेलू शेयर बाजार में तेजी का सिलसिला थमने का नाम नहीं ले रहा है। आज कारोबारी सत्र के दौरान बीएसई सेंसेक्स 750 अंकों की छलांग लगाकर नए रिकॉर्ड स्तर 85,300 पर बंद हुआ, वहीं निफ्टी 50 ने 26,000 का स्तर छुआ।

बाजार विश्लेषकों के अनुसार, भारत की मजबूत जीडीपी ग्रोथ, स्थिर मुद्रास्फीति और त्योहारी सीजन में खपत में जबरदस्त वृद्धि से बाजार में सकारात्मक माहौल बना हुआ है। बैंकिंग, ऑटोमोबाइल और रिन्यूएबल एनर्जी शेयरों में सबसे ज्यादा खरीदारी दर्ज की गई।`,
    category: 'बिजनेस',
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-27T18:10:00Z',
    reporterName: 'दीपक मेहता (F9 मार्केट एनालिस्ट)',
    location: 'मुंबई',
    views: 9800,
    likes: 540,
    shares: 160,
    tags: ['बिजनेस', 'शेयर बाजार', 'सेंसेक्स', 'निफ्टी', 'निवेश'],
    status: 'published',
    comments: [],
  },
  {
    id: 'f9-art-108',
    title: 'मनोरंजन: राष्ट्रीय फिल्म पुरस्कारों का ऐलान, भारतीय सिनेमा के दिग्गजों को मिला सर्वोच्च सम्मान',
    summary: 'समारोह में सर्वश्रेष्ठ अभिनेता, अभिनेत्री और फीचर फिल्मों की घोषणा, दर्शकों और आलोचकों ने की सराहना।',
    content: `नई दिल्ली: सिनेमा जगत के सबसे प्रतिष्ठित राष्ट्रीय फिल्म पुरस्कारों की घोषणा विज्ञान भवन में की गई। इस वर्ष क्षेत्रीय भाषाओं की यथार्थवादी और सामाजिक सरोकारों पर आधारित फिल्मों का दबदबा देखने को मिला।

सर्वश्रेष्ठ अभिनेता का पुरस्कार समाज में सकारात्मक बदलाव की कहानी पेश करने वाले नायक को दिया गया। जूरी अध्यक्ष ने कहा कि भारतीय सिनेमा आज वैश्विक मंच पर अपनी अनूठी पहचान और रचनात्मकता का परचम लहरा रहा है।`,
    category: 'मनोरंजन',
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-27T16:00:00Z',
    reporterName: 'अनुष्का कपूर (F9 बॉलीवुड डेस्क)',
    location: 'मुंबई / नई दिल्ली',
    views: 13200,
    likes: 870,
    shares: 280,
    tags: ['मनोरंजन', 'सिनेमा', 'अवार्ड्स', 'बॉलीवुड'],
    status: 'published',
    comments: [],
  },
  {
    id: 'f9-art-109',
    title: 'टेक्नोलॉजी: भारत का अपना स्वदेशी AI मॉडल हुआ लाइव, 22 भारतीय भाषाओं में देगा सटीक उत्तर',
    summary: 'भारतीय वैज्ञानिकों और तकनीकी संस्थानों द्वारा विकसित बहुभाषी आर्टिफिशियल इंटेलिजेंस मॉडल अब जनता के लिए उपलब्ध।',
    content: `बेंगलुरु: कृत्रिम बुद्धिमत्ता (AI) के क्षेत्र में भारत ने एक और ऐतिहासिक उपलब्धि हासिल कर ली है। पूर्ण रूप से भारतीय भाषाओं और संस्कृति पर प्रशिक्षित इस एआई मॉडल की मदद से किसान, छात्र और डॉक्टर अपनी मातृभाषा में तुरंत जानकारी प्राप्त कर सकेंगे।

यह मॉडल इंटरनेट के कम बैंडविड्थ पर भी तेजी से काम करने में सक्षम है। डेवलपर्स के लिए इसके एपीआई को मुफ़्त उपलब्ध कराया जा रहा है ताकि स्थानीय स्टार्टअप्स और सरकारी सेवाएं इसे आसानी से अपना सकें।`,
    category: 'टेक्नोलॉजी',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-27T14:20:00Z',
    reporterName: 'गौरव जैन (F9 टेक ब्यूरो)',
    location: 'बेंगलुरु',
    views: 17800,
    likes: 1450,
    shares: 720,
    isTrending: true,
    tags: ['टेक्नोलॉजी', 'AI', 'डिजिटल भारत', 'बेंगलुरु'],
    status: 'published',
    comments: [],
  },
  {
    id: 'f9-art-110',
    title: 'स्थानीय समाचार: जिला स्तर पर समाधान दिवस में सुनी गईं 500 से अधिक शिकायतें, 80% का मौके पर निस्तारण',
    summary: 'जिलाधिकारी और पुलिस अधीक्षक की अध्यक्षता में लगे शिविर में बिजली, पानी और भूमि विवादों का त्वरित समाधान।',
    content: `तहसील सभागार: शासन के निर्देशानुसार आयोजित संपूर्ण समाधान दिवस में फरियादियों की भारी भीड़ उमड़ी। अधिकारियों ने एक-एक कर जनता की समस्याओं को सुना और संबंधित विभागों के अफसरों को सख्त निर्देश दिए कि जनहित के मामलों में किसी भी प्रकार की लापरवाही बर्दाश्त नहीं की जाएगी।

किसानों के भूमि सीमांकन और ग्रामीण रास्तों पर जलभराव की समस्या का तत्काल टीमें भेजकर निपटारा कराया गया। जिलाधिकारी ने कहा कि पारदर्शी प्रशासन ही हमारी सर्वोच्च प्राथमिकता है।`,
    category: 'स्थानीय समाचार',
    imageUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-27T11:00:00Z',
    reporterName: 'मनोज कुमार (F9 ग्रामीण संवाददाता)',
    reporterId: 'rep-local-05',
    location: 'वाराणसी / गोरखपुर ग्रामीण',
    views: 6540,
    likes: 310,
    shares: 95,
    tags: ['स्थानीय समाचार', 'समाधान दिवस', 'प्रशासन', 'गांव'],
    status: 'published',
    comments: [],
  },
  {
    id: 'f9-art-111',
    title: 'विशेष रिपोर्ट: डिजिटल मीडिया विज्ञापन से स्थानीय व्यापार को कैसे मिले नई ऊंचाई? F9NEWSINDIA बिजनेस गाइड',
    summary: 'छोटे और मध्यम व्यापारियों के लिए डिजिटल मार्केटिंग, सोशल मीडिया प्रमोशन और ब्रांडिंग का सही तरीका।',
    content: `डिजिटल युग में किसी भी व्यापार की सफलता उसकी ऑनलाइन उपस्थिति पर निर्भर करती है। F9NEWSINDIA डिजिटल मार्केटिंग टीम ने स्थानीय दुकानदारों, कोचिंग संस्थानों, रियल एस्टेट डेवलपर्स और डॉक्टरों के लिए विशेष प्रचार पैकेज पेश किए हैं।

F9NEWSINDIA के लाखों दैनिक पाठकों तक अपनी दुकान या सेवा का प्रचार पहुंचाकर अपने कारोबार को नई गति दें। विज्ञापन संबंधी पूछताछ के लिए हमारे विज्ञापन अनुभाग पर संपर्क करें।`,
    category: 'बिजनेस',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
    publishedAt: '2026-10-27T09:00:00Z',
    reporterName: 'F9 विज्ञापन एवं मार्केटिंग ब्यूरो',
    location: 'नई दिल्ली',
    views: 4200,
    likes: 190,
    shares: 88,
    isSponsored: true,
    sponsoredBrand: 'F9 Digital Media Services',
    tags: ['बिजनेस', 'डिजिटल मार्केटिंग', 'विज्ञापन', 'F9NEWS'],
    status: 'published',
    comments: [],
  },
];

export const INITIAL_VIDEOS: NewsVideo[] = [
  {
    id: 'vid-1',
    title: 'F9NEWSINDIA LIVE 24x7 | देश और राज्यों की सभी बड़ी ख़बरें सबसे पहले सच की आवाज़ के साथ',
    youtubeId: 'live_stream',
    thumbnailUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=1000&auto=format&fit=crop&q=80',
    duration: 'LIVE',
    category: 'देश',
    views: '45.2K लाइव दर्शक',
    publishedAt: 'अभी लाइव',
    isLive: true,
  },
  {
    id: 'vid-2',
    title: 'महाराष्ट्र में विकास की नई रफ्तार: समृद्धि महामार्ग और मुंबई मेट्रो प्रोजेक्ट्स पर F9 की एक्सक्लूसिव ग्राउंड रिपोर्ट',
    youtubeId: 'mh_report_01',
    thumbnailUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=1000&auto=format&fit=crop&q=80',
    duration: '08:45',
    category: 'महाराष्ट्र',
    views: '88K बार देखा गया',
    publishedAt: '4 घंटे पहले',
  },
  {
    id: 'vid-3',
    title: 'जेवर इंटरनेशनल एयरपोर्ट का रनवे ट्रायल सफल, पश्चिमी यूपी के लिए क्या बदल जाएगा? देखिए रिपोर्ट',
    youtubeId: 'jewar_airport_trail',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1000&auto=format&fit=crop&q=80',
    duration: '06:12',
    category: 'उत्तर प्रदेश',
    views: '124K बार देखा गया',
    publishedAt: '6 घंटे पहले',
  },
  {
    id: 'vid-4',
    title: '60 सेकंड्स बुलेटिन: आज सुबह की 10 सबसे बड़ी सुर्खियां फटाफट अंदाज में | F9 News Shorts',
    youtubeId: 'shorts_bulletin_01',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1000&auto=format&fit=crop&q=80',
    duration: '00:58',
    category: 'देश',
    views: '340K बार देखा गया',
    publishedAt: '8 घंटे पहले',
    isShort: true,
  },
  {
    id: 'vid-5',
    title: 'साइबर ठगी से कैसे बचें? मुंबई पुलिस साइबर सेल एक्सपर्ट्स ने दिए 5 जरूरी सुरक्षा टिप्स | F9 स्पेशल',
    youtubeId: 'cyber_crime_awareness',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80',
    duration: '11:20',
    category: 'अपराध',
    views: '65K बार देखा गया',
    publishedAt: '1 दिन पहले',
  },
  {
    id: 'vid-6',
    title: 'शेयर बाजार में लगातार तेजी के पीछे कौन से 3 बड़े कारण हैं? रिटेल निवेशक क्या करें? | बिजनेस इनसाइट',
    youtubeId: 'market_bull_run',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1000&auto=format&fit=crop&q=80',
    duration: '09:30',
    category: 'बिजनेस',
    views: '42K बार देखा गया',
    publishedAt: '1 दिन पहले',
  },
];

export const INITIAL_ADS: AdBanner[] = [
  {
    id: 'ad-top-01',
    title: 'F9NEWSINDIA डिजिटल विज्ञापन सेवाएँ - अपने व्यवसाय को दें नई उड़ान',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&auto=format&fit=crop&q=80',
    linkUrl: 'https://f9newsindia.blogspot.com/2026/10/about-us-f9newsindia.html',
    sponsorName: 'F9 Digital Advertising',
    position: 'top',
    active: true,
  },
  {
    id: 'ad-feed-01',
    title: 'Google AdMob / प्रायोजित विज्ञापन स्थान - अपने ब्रांड का प्रचार लाखों पाठकों तक करें',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
    linkUrl: 'https://f9newsindia.blogspot.com/2026/10/about-us-f9newsindia.html',
    sponsorName: 'Google AdMob पार्टनर नेटवर्क',
    position: 'feed',
    active: true,
  },
];

export const DEFAULT_USER: UserProfile = {
  id: 'usr-f9-001',
  name: 'F9 पाठक',
  email: 'f9newsindia@gmail.com',
  phone: '+91 98765 43210',
  role: 'admin',
  reporterBadgeId: 'F9-PRESS-DELHI-001',
  district: 'नई दिल्ली',
  savedArticleIds: ['f9-art-101'],
  likedArticleIds: ['f9-art-101', 'f9-art-102'],
  notificationsEnabled: true,
  breakingAlertsEnabled: true,
  language: 'hi',
};

// Store Helper class
class NewsDataStore {
  private static instance: NewsDataStore;
  private articles: NewsArticle[] = [];
  private breakingNews: string[] = [];
  private videos: NewsVideo[] = [];
  private ads: AdBanner[] = [];
  private currentUser: UserProfile = DEFAULT_USER;
  private admobEnabled: boolean = true;

  private constructor() {
    this.loadFromStorage();
  }

  public static getInstance(): NewsDataStore {
    if (!NewsDataStore.instance) {
      NewsDataStore.instance = new NewsDataStore();
    }
    return NewsDataStore.instance;
  }

  private loadFromStorage() {
    try {
      const storedArticles = localStorage.getItem('f9_articles');
      this.articles = storedArticles ? JSON.parse(storedArticles) : INITIAL_ARTICLES;

      const storedBreaking = localStorage.getItem('f9_breaking');
      this.breakingNews = storedBreaking ? JSON.parse(storedBreaking) : INITIAL_BREAKING_NEWS;

      const storedVideos = localStorage.getItem('f9_videos');
      this.videos = storedVideos ? JSON.parse(storedVideos) : INITIAL_VIDEOS;

      const storedAds = localStorage.getItem('f9_ads');
      this.ads = storedAds ? JSON.parse(storedAds) : INITIAL_ADS;

      const storedUser = localStorage.getItem('f9_user');
      this.currentUser = storedUser ? JSON.parse(storedUser) : DEFAULT_USER;

      const storedAdmob = localStorage.getItem('f9_admob_status');
      this.admobEnabled = storedAdmob !== null ? JSON.parse(storedAdmob) : true;
    } catch {
      this.articles = INITIAL_ARTICLES;
      this.breakingNews = INITIAL_BREAKING_NEWS;
      this.videos = INITIAL_VIDEOS;
      this.ads = INITIAL_ADS;
      this.currentUser = DEFAULT_USER;
      this.admobEnabled = true;
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('f9_articles', JSON.stringify(this.articles));
      localStorage.setItem('f9_breaking', JSON.stringify(this.breakingNews));
      localStorage.setItem('f9_videos', JSON.stringify(this.videos));
      localStorage.setItem('f9_ads', JSON.stringify(this.ads));
      localStorage.setItem('f9_user', JSON.stringify(this.currentUser));
      localStorage.setItem('f9_admob_status', JSON.stringify(this.admobEnabled));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  // Articles API
  public getArticles(category?: string, query?: string): NewsArticle[] {
    let list = this.articles.filter((a) => a.status === 'published');

    if (category && category !== 'सभी') {
      list = list.filter((a) => a.category === category);
    }

    if (query && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.reporterName.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }

  public getAllArticlesForAdmin(): NewsArticle[] {
    return this.articles;
  }

  public getArticleById(id: string): NewsArticle | undefined {
    return this.articles.find((a) => a.id === id);
  }

  public addArticle(newArticle: Omit<NewsArticle, 'id' | 'views' | 'likes' | 'shares' | 'comments'>): NewsArticle {
    const article: NewsArticle = {
      ...newArticle,
      id: `f9-art-${Date.now()}`,
      views: 1,
      likes: 0,
      shares: 0,
      comments: [],
    };

    this.articles.unshift(article);
    this.saveToStorage();
    return article;
  }

  public updateArticleStatus(id: string, status: 'published' | 'pending' | 'rejected', reason?: string): boolean {
    const item = this.articles.find((a) => a.id === id);
    if (item) {
      item.status = status;
      if (reason) item.rejectionReason = reason;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public deleteArticle(id: string): boolean {
    const prevLen = this.articles.length;
    this.articles = this.articles.filter((a) => a.id !== id);
    if (this.articles.length !== prevLen) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public incrementViews(id: string) {
    const item = this.articles.find((a) => a.id === id);
    if (item) {
      item.views += 1;
      this.saveToStorage();
    }
  }

  public toggleLike(id: string): boolean {
    const item = this.articles.find((a) => a.id === id);
    if (!item) return false;

    const isLiked = this.currentUser.likedArticleIds.includes(id);
    if (isLiked) {
      this.currentUser.likedArticleIds = this.currentUser.likedArticleIds.filter((x) => x !== id);
      item.likes = Math.max(0, item.likes - 1);
    } else {
      this.currentUser.likedArticleIds.push(id);
      item.likes += 1;
    }

    this.saveToStorage();
    return !isLiked;
  }

  public toggleBookmark(id: string): boolean {
    const isBookmarked = this.currentUser.savedArticleIds.includes(id);
    if (isBookmarked) {
      this.currentUser.savedArticleIds = this.currentUser.savedArticleIds.filter((x) => x !== id);
    } else {
      this.currentUser.savedArticleIds.push(id);
    }
    this.saveToStorage();
    return !isBookmarked;
  }

  public isBookmarked(id: string): boolean {
    return this.currentUser.savedArticleIds.includes(id);
  }

  public isLiked(id: string): boolean {
    return this.currentUser.likedArticleIds.includes(id);
  }

  public addComment(articleId: string, text: string, userName?: string): boolean {
    const item = this.articles.find((a) => a.id === articleId);
    if (!item) return false;

    item.comments.unshift({
      id: `c-${Date.now()}`,
      userName: userName || this.currentUser.name || 'F9 पाठक',
      text,
      timestamp: 'अभी-अभी',
      likes: 0,
    });

    this.saveToStorage();
    return true;
  }

  // Breaking News
  public getBreakingNews(): string[] {
    return this.breakingNews;
  }

  public addBreakingNews(text: string) {
    if (!text.trim()) return;
    this.breakingNews.unshift(text.trim());
    this.saveToStorage();
  }

  public removeBreakingNews(index: number) {
    this.breakingNews.splice(index, 1);
    this.saveToStorage();
  }

  // Videos
  public getVideos(): NewsVideo[] {
    return this.videos;
  }

  // Ads & AdMob
  public getAds(): AdBanner[] {
    return this.ads;
  }

  public isAdmobEnabled(): boolean {
    return this.admobEnabled;
  }

  public toggleAdmob(enabled: boolean) {
    this.admobEnabled = enabled;
    this.saveToStorage();
  }

  // User
  public getCurrentUser(): UserProfile {
    return this.currentUser;
  }

  public updateUserProfile(updates: Partial<UserProfile>) {
    this.currentUser = { ...this.currentUser, ...updates };
    this.saveToStorage();
  }

  // Analytics
  public getAnalytics() {
    const totalViews = this.articles.reduce((acc, a) => acc + (a.views || 0), 0);
    const totalLikes = this.articles.reduce((acc, a) => acc + (a.likes || 0), 0);
    const totalArticles = this.articles.length;
    const pendingCount = this.articles.filter((a) => a.status === 'pending').length;
    const publishedCount = this.articles.filter((a) => a.status === 'published').length;

    return {
      totalViews,
      totalLikes,
      totalArticles,
      pendingCount,
      publishedCount,
      activeReadersNow: Math.floor(totalViews * 0.08) + 142,
    };
  }

  public resetToDefault() {
    this.articles = INITIAL_ARTICLES;
    this.breakingNews = INITIAL_BREAKING_NEWS;
    this.videos = INITIAL_VIDEOS;
    this.ads = INITIAL_ADS;
    this.currentUser = DEFAULT_USER;
    this.admobEnabled = true;
    this.saveToStorage();
  }
}

export const newsStore = NewsDataStore.getInstance();
