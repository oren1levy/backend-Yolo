import axios from "axios";
import { readFile, writeFile } from 'fs/promises'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const BASE_URL = "https://api.metalpriceapi.com/v1/latest";
const API_KEY = "d1f2f500fce04f8b9eb47f2928c0c6fe";
const CACHE_PATH = path.join(__dirname, "../metalscache.json")
const UPDATE_RATE = 60 * 60 * 1000 * 3;  // 3 Hour

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        return false;
    }
}

const fetchMetalPrices = async () => {
    const resp = await axios.get(`${BASE_URL}?api_key=${API_KEY}`);
    const json = await resp.data;
    const rates = json['rates'];

    return {"Silver": rates['USDXAG'], "Gold": rates['USDXAU']}
}

const getCache = async () => {
    try {
        const cacheData = await readFile(CACHE_PATH, 'utf8');
        const cacheJson = JSON.parse(cacheData);

        return cacheJson;
    } catch(error) {
        console.error(error);
        return { "timestamp": 0 }
    }
}

const saveCache = async (ts, metalPrices, diamondPrices) => {
    const data = {
        "timestamp": ts,
        "prices": {
            ...metalPrices,
            ...diamondPrices
        }
    }

    await writeFile(CACHE_PATH, JSON.stringify(data));
    return data;
}

const getPrices = async () => {
    const now = Date.now();

    // Check cache
    let cache = await getCache();
    const timeFromLastUpdate = now - cache['timestamp'];
    if(Math.floor(timeFromLastUpdate / 1000) <= UPDATE_RATE) return cache['prices'];

    console.table(cache)
    console.table(timeFromLastUpdate)
    
    const metalData = await fetchMetalPrices();

    cache = await saveCache(now, metalData, {});
    return cache['prices'];
}

export default {
    getPrices
}
