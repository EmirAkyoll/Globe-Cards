import { Country } from "../interfaces/Country.interface";

export function prepareDeduplicatedData(countries: any[], dataToBePrepare: string) {
    const data: Set<string> = new Set();
    if (dataToBePrepare === 'continent') {
        countries?.forEach((country: any) => {
            data.add(country?.continent?.name);
        });
        return Array.from(data);
    }
    
    if (dataToBePrepare === 'languages') {
        countries?.forEach((country: any, index: number) => {
            data.add(country?.languages[index]?.name);
        });
        console.log("languages: ", Array.from(data));
        return Array.from(data);
    }

    countries?.forEach((country: any) => {
        data.add(country[dataToBePrepare]);
    });
    
    return Array.from(data);
}