import HTMLParser from 'fast-html-parser';

const URL_STORE =
  'https://search.naver.com/p/csearch/content/nqapirender.nhn?pkid=465&where=m';
const URL_GS = 'http://gs25.gsretail.com/gscvs/ko/products/event-goods-search';
const Display = 20;

export async function requestStoreEvent({page, store, category, type}) {
  const param = `&start=${page}&display=${Display}&u1=${store}&u2=${category}&u3=${type}&u4=&u5=&u6=&u9=page`;
  const response = await fetch(URL_STORE + param, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return (await response.json()).current.html;
}

export function parseStoreHTML(html, eventType) {
  const itemsHTML = HTMLParser.parse(html).querySelectorAll('li');
  return itemsHTML.map(item => {
    let name = item.querySelector('.item_info .item_name .name_text').text;
    let price = item.querySelector('.item_info .item_price').text;
    if (eventType === '증정') {
      const nameSet = name.split('(' + eventType + ')');
      name = nameSet[0] + '\r\n[증정]' + nameSet[1];
    }
    if (eventType === '할인') {
      const priceSet = price.split('원');
      price = priceSet[1] + '원 -> ' + priceSet[0] + '원';
    }

    return {
      img: item.querySelector('.thumb img').attributes.src,
      name,
      price: price,
    };
  });
}

export async function requestGSEvent({page, type, keyword}) {
  let urlParam = `?pageNum=${page}&pageSize=${25}&parameterList=${type}`;
  if (keyword !== '') {
    urlParam += `&s
    earchType=${keyword}&searchWord=${keyword}`;
  }

  const response = await fetch(URL_GS + urlParam, {
    method: 'GET',
  });
  return await response.json();
}

export function parseGSJSON(json) {
  const data = JSON.parse(json);
  return data.results.map(item => {
    let result = {
      img: item.attFileNm,
      name: item.goodsNm,
      price: item.price + '원',
    };

    if (item.eventTypeSp.code === 'GIFT' && item.giftAttFileNm) {
      result.gift = {
        img: item.giftAttFileNm,
        name: item.giftGoodsNm + ' 증정',
      };
    }

    return result;
  });
}
