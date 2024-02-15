import { Country } from "../interfaces/Country.interface";

export function prepareDeduplicatedData(countries: Country[], dataToBePrepare: string) {
    const data: Set<string> = new Set();
    if (dataToBePrepare === 'continent') {
        countries?.forEach((country: any) => {
            data.add(country?.continent?.name);
        });
        return Array.from(data);
    }
    
    if (dataToBePrepare === 'languages') {
        countries?.forEach(country => {
            country?.languages?.forEach((language: any) => {
                data.add(language.name);
            });
        });        
        return Array.from(data);
    }

    countries?.forEach((country: any) => {
        data.add(country[dataToBePrepare]);
    });
    
    return Array.from(data);
}
