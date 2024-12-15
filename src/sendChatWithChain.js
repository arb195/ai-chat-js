import { ChatOpenAI } from "@langchain/openai";

import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import { Document } from "@langchain/core/documents";

// Import environment variables
import dotenv from "dotenv";
dotenv.config();

export async function sendToOpenAi(userInput, chatHistory) {
  const model = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.7,
  });

  // Create prompt
  const prompt = ChatPromptTemplate.fromTemplate(
    `Answer the user's question in persian language from the following context: 
  {context}
  Question: {input}
  chat_history:{chatHistory}
  `
  );

  // Create Chain
  const chain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  });

  // Manually create documents
  const document1 = new Document({
    pageContent:
      "میلگرد یک نوع فولاد تقویتی است که در سازه‌های بتنی به کار می‌رود تا مقاومت کششی سازه را افزایش دهد. برای خرید انواع میلگرد به صفحه زیر مراجعه کنید.",
  });

  const document2 = new Document({
    pageContent:
      "میلگردها به انواع A1، A2، A3 و A4 تقسیم می‌شوند که هر کدام کاربرد و مشخصات مکانیکی متفاوتی دارند. برای خرید انواع میلگرد روی لینک زیر بزنید.",
  });

  const document3 = new Document({
    pageContent:
      "قیمت میلگرد بر اساس وزن، نوع آن (آجدار یا ساده) و کارخانه تولید کننده محاسبه می‌شود. برای مشاهده قیمت روز میلگرد روی لینک زیر بزنید.",
  });

  const document4 = new Document({
    pageContent:
      "وزن میلگرد را می‌توان از طریق فرمول: وزن میلگرد = شعاع (mm) * شعاع (mm) * 3.14 * طول (mm) * 1000 / 7.8 به دست آورد. شما می‌توانید وزن انواع میلگرد را از طریق لینک زیر محاسبه کنید.",
  });

  const document5 = new Document({
    pageContent:
      "1000 / [چگالی * طول * [(ضخامت جان * طول جان) + (ضخامت بال * عرض بال)] * 2] = وزن یک شاخه تیرآهن برای محاسبه آنلاین وزن تیرآهن به صفحه جدول وزن تیرآهن مراجعه کنید.",
  });

  const document6 = new Document({
    pageContent:
      "برای محاسبه وزن انواع مقاطع فولادی می‌توانید به صفحه جدول وزن آهن‌ آلات مراجعه کرده و پس از انتخاب مقطع مورد نظر وزن آن را به راحتی محاسبه کنید.",
  });

  const document7 = new Document({
    pageContent:
      "برای یک خرید سریع و مطمئن از یک بازرگانی با سابقه و بدون واسطه می‌توانید با شماره 03191009009 تماس گرفته تا کارشناسان فروش شما را به بهترین نحو راهنمایی کنند و یا از طریق وبسایت https://www.markazeahan.com/ محصول مورد نظر خود را انتخاب کرده، آن را به سبد خرید اضافه و سپس بر روی دکمه ثبت نهایی بزنید.",
  });

  const document8 = new Document({
    pageContent:
      "قیمت میلگرد تحت تأثیر عواملی چون قیمت مواد اولیه، نرخ ارز، عرضه و تقاضا و تغییرات جهانی است. برای مشاهده قیمت روز میلگرد روی لینک زیر بزنید.",
  });

  const document9 = new Document({
    pageContent:
      "شما می‌توانید برای مشاهده فروش ویژه انواع مقاطع فولادی به تلگرام مرکزآهن https://t.me/markazeahan یا اینستاگرام https://www.instagram.com/markazeahan/ این مجموعه مراجعه کنید.",
  });

  const document10 = new Document({
    pageContent:
      "ورق فولادی، صفحات مسطح از فولاد هستند که در ضخامت‌های مختلف تولید می‌شوند و در صنایع مختلف از جمله خودرو و ساختمان‌سازی استفاده می‌شوند. برای خرید انواع ورق فولادی به لینک زیر مراجعه کنید.",
  });

  const document11 = new Document({
    pageContent:
      "برای مشاهده قیمت روز انواع ورق فولادی می‌توانید روی لینک زیر بزنید.",
  });

  const document12 = new Document({
    pageContent:
      "برای مشاهده قیمت روز انواع قوطی و پروفیل می‌توانید روی لینک زیر بزنید.",
  });

  const document13 = new Document({
    pageContent: "برای مشاهده قیمت روز تیرآهن می‌توانید روی لینک زیر بزنید.",
  });

  const document14 = new Document({
    pageContent: "برای مشاهده قیمت روز نبشی می‌توانید روی لینک زیر بزنید.",
  });

  const document15 = new Document({
    pageContent:
      "برای محاسبه هزینه حمل آهن آلات ابتدا به صفحه https://www.markazeahan.com/transport/ وارد شده، محل بارگیری و محل تخلیه خود را انتخاب کنید، هزینه ارسال بار توسط تریلی به شما نمایش داده می‌شود.",
  });

  const document16 = new Document({
    pageContent:
      "در صورتی که شما محصولات خود را از مرکزآهن خریداری کنید، مرکزآهن انواع خدمات را با بهترین قیمت بر روی مقاطع فولادی شما انجام می‌دهد. برای مشاهده انواع خدمات می‌توانید روی لینک https://www.markazeahan.com/services/ کلیک کنید.",
  });

  const document17 = new Document({
    pageContent:
      "مرکزآهن با پشتوانه‌ای به قدمت بیش از 35 سال در بازار آهن، دارای دو دفتر در شهرهای اصفهان و تهران است و شما علاوه بر خرید آنلاین، می‌توانید به صورت حضوری هم خرید خود را انجام دهید. از طریق لینک زیر می‌توانید با مرکزآهن بیشتر آشنا شوید.",
  });

  const document18 = new Document({
    pageContent:
      "شما همه روزه حتی در روزهای تعطیل می‌توانید خرید خود را از مرکزآهن انجام دهید. امکان خرید حضوری از ساعت 8 الی 17 در تمام روزهای هفته برای شما فراهم است ولی برای دریافت مشاوره یا خرید آنلاین در هر ساعت از شبانه‌روز می‌توانید با مرکزآهن تماس بگیرید.",
  });

  const document19 = new Document({
    pageContent:
      "مرکزآهن با پشتیبانی 24 ساعته، خرید امن و راحت را برای شما فراهم کرده است. همچنین علاوه بر کارشناسان فروش، تیم رضایت‌سنجی مرکزآهن هم در تمام مراحل خرید در کنار شماست.",
  });

  const document20 = new Document({
    pageContent:
      "مرکزآهن مرجع قیمت‌گذاری مقاطع فولادی است و شما در سایت و کانال‌های تلگرامی می‌توانید از قیمت لحظه‌ای تمام مقاطع با خبر شوید.",
  });

  const document21 = new Document({
    pageContent:
      "بله. برای اطلاع از شرایط LC با شماره 03191009009 تماس بگیرید تا کارشناسان مربوطه بتوانند به بهترین نحو شما را راهنمایی کنند.",
  });

  const document22 = new Document({
    pageContent:
      "برای خرید میلگرد شما باید به مراکز معتبر مراجعه کنید. مرکزآهن با بیش از 30 سال سابقه انتخابی عالی برای تامین نیازهای فولادی شماست. برای خرید میلگرد و دیگر مقاطع فولادی می‌توانید با شماره 03191009009 تماس بگیرید.",
  });

  const document23 = new Document({
    pageContent:
      "انتخاب پروفیل مناسب به نوع سازه و شرایط محیطی بستگی دارد. ما در مرکزآهن انواع پروفیل ساختمانی و صنعتی را ارائه می‌دهیم. برای دیدن انواع پروفیل و انتخاب مناسب، به دسته‌بندی پروفیل‌ها سر بزنید.",
  });

  const document24 = new Document({
    pageContent:
      "بله، مرکزآهن محصولات خود را به کشورهای مختلف صادر می‌کند. برای اطلاعات بیشتر به صفحه صادرات مراجعه کنید.",
  });

  const document25 = new Document({
    pageContent:
      "برای مشاهده قیمت‌های به‌روز پوشش و سوله به صفحه این محصول یا کانال تلگرام https://t.me/markazeahan5 مراجعه کنید.",
  });

  const document26 = new Document({
    pageContent:
      "لوله بدون درز مقاومت بیشتری دارد و در فشارهای بالا استفاده می‌شود، در حالی که لوله درزدار برای مصارف عمومی مناسب است. برای مشاهده انواع لوله به اینجا مراجعه کنید.",
  });

  const document27 = new Document({
    pageContent:
      "بله، پروفیل‌ها در سایزها و ابعاد مختلف عرضه می‌شوند. برای دیدن سایزهای موجود به صفحه محصولات پروفیل سر بزنید.",
  });

  const document28 = new Document({
    pageContent:
      "بله، شما می‌توانید برای اطلاع از موقعیت‌های شغلی مرکزآهن به صفحه فرصت‌های شغلی مراجعه کرده و رزومه خود را برای موقعیت مد نظر ارسال کنید.",
  });

  const document29 = new Document({
    pageContent:
      "قوطی‌ها پروفیل‌های مربعی یا مستطیلی هستند که در ساخت و ساز و سازه‌های فلزی استفاده می‌شوند. برای مشاهده انواع قوطی به صفحه محصولات قوطی سر بزنید. شما همچنین می‌توانید برای مطالعه در خصوص انواع مقاطع فولادی به لینک زیر مراجعه کنید.",
  });

  const document30 = new Document({
    pageContent:
      "با توجه به نیاز سازه و پس از مشورت با مهندس سازه، می‌توانید قوطی مناسب از لحاظ سایز و وزن را انتخاب کنید. برای خرید انواع قوطی به اینجا مراجعه کنید.",
  });

  const document31 = new Document({
    pageContent:
      "قوطی پروفیل ساختمانی برای ساخت اسکلت‌های فلزی ساختمان استفاده می‌شود. برای دیدن انواع قوطی‌های ساختمانی به صفحه محصولات قوطی مراجعه کنید.",
  });

  const document32 = new Document({
    pageContent:
      "بله، قوطی‌ها در ابعاد و ضخامت‌های مختلف تولید می‌شوند. برای مشاهده سایزهای موجود به صفحه قوطی‌ها سر بزنید.",
  });

  const document33 = new Document({
    pageContent:
      "قوطی‌های صنعتی در صنایع ماشین‌سازی و تجهیزات سنگین استفاده می‌شوند. برای مشاهده محصولات قوطی صنعتی به اینجا مراجعه کنید.",
  });

  const document34 = new Document({
    pageContent:
      "مرکزآهن با سال‌ها تجربه و سابقه درخشان در صنعت آهن و فولاد، خدمات قابل اعتمادی را ارائه می‌دهد. برای مشاهده خدمات و محصولات مرکزآهن به صفحه اصلی سایت مراجعه کنید.",
  });

  const document35 = new Document({
    pageContent:
      "پروفیل‌ها یکی از مقاطع فولادی مهم در ساخت و ساز هستند و مرکزآهن ارائه‌دهنده انواع پروفیل‌های ساختمانی و صنعتی است. برای مشاهده محصولات پروفیل به اینجا مراجعه کنید.",
  });

  const document36 = new Document({
    pageContent:
      "مرکزآهن در طی سال‌ها فعالیت خود، اعتماد مشتریان خود را جلب کرده است و خدمات پس از فروش مناسبی را برای شما فراهم کرده است. برای مشاهده خدمات بیشتر به اینجا مراجعه کنید.",
  });

  const document37 = new Document({
    pageContent:
      "در صورتی که پروفیل انتخابی شما در انبار موجود نباشد، می‌توانید از طریق تماس با شماره 03191009009 یا وبسایت مرکزآهن، موجودی سایر محصولات را بررسی کنید.",
  });

  const document38 = new Document({
    pageContent:
      "بله، برای انتخاب محصول مناسب می‌توانید با کارشناسان مرکزآهن تماس بگیرید و اطلاعات لازم را دریافت کنید.",
  });

  const document39 = new Document({
    pageContent:
      "قیمت ورق فولادی تحت تاثیر عواملی چون نوسانات بازار و نرخ ارز قرار دارد. برای اطلاع از قیمت روز ورق فولادی به سایت مرکزآهن مراجعه کنید.",
  });

  const document40 = new Document({
    pageContent:
      "مرکزآهن علاوه بر فروش مقاطع فولادی، خدمات برش و خم‌کاری را نیز ارائه می‌دهد. برای مشاهده خدمات برش و خم‌کاری به اینجا مراجعه کنید.",
  });

  // Invoke Chain
  const response = await chain.invoke({
    input: userInput,
    context: [
      document1,
      document2,
      document3,
      document4,
      document5,
      document6,
      document7,
      document8,
      document9,
      document10,
      document11,
      document12,
      document13,
      document14,
      document15,
      document16,
      document17,
      document18,
      document19,
      document20,
      document21,
      document22,
      document23,
      document24,
      document25,
      document26,
      document27,
      document28,
      document29,
      document30,
      document31,
      document32,
      document33,
      document34,
      document35,
      document36,
      document37,
      document38,
      document39,
      document40,
    ],
    chatHistory: chatHistory,
  });

  return response;
}
