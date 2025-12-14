const axios = require("axios");

const ASIN_REGEX = /(?:dp|gp\/product|dp\/product|gp\/aw\/d|gp\/offer-listing|o\/ASIN|gp\/registry\/wishlist)\/([A-Z0-9]{10})/i;

async function extractAsinFromUrl(url) {
  if (!url) {
    return null;
  }

  try {
    const response = await axios.get(url, {
      maxRedirects: 5,
      timeout: 5000,
      validateStatus: (status) => status >= 200 && status < 400,
    });

    const finalUrl =
      response?.request?.res?.responseUrl || response?.request?.path || url;
    const match = finalUrl.match(ASIN_REGEX);
    return match ? match[1] : null;
  } catch (error) {
    console.error(`Failed to resolve Amazon URL: ${error.message}`);
    return null;
  }
}

async function fetchItemDetailsByAsin(asin) {
  if (!asin) {
    return null;
  }

  const productUrl = `https://www.amazon.com/dp/${asin}`;
  try {
    const response = await axios.get(productUrl, {
      timeout: 8000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    const html = response?.data || "";

    const titleMatch =
      html.match(/<span[^>]*id=["']productTitle["'][^>]*>\s*([^<]+)\s*<\/span>/i) ||
      html.match(/<title>\s*([^<]+)\s*<\/title>/i);
    const priceMatch =
      html.match(/id=["']priceblock_ourprice["'][^>]*>([^<]+)</i) ||
      html.match(/id=["']priceblock_dealprice["'][^>]*>([^<]+)</i);
    const imageMatch = html.match(/"large"\s*:\s*"([^\"]+)"/i);

    return {
      asin,
      title: titleMatch ? titleMatch[1].trim() : "",
      price: priceMatch ? priceMatch[1].trim() : "",
      image: imageMatch ? imageMatch[1] : "",
      url: productUrl,
    };
  } catch (error) {
    console.error(`Failed to fetch product page for ASIN ${asin}: ${error.message}`);
    return {
      asin,
      title: "",
      price: "",
      image: "",
      url: productUrl,
    };
  }
}

module.exports = {
  extractAsinFromUrl,
  fetchItemDetailsByAsin,
};
