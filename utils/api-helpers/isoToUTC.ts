function isoToUTC(isoDate: string | null | undefined): Date {
    if (isoDate === null) {
        return new Date();
    }
    const date = new Date(isoDate ?? '');
    return date;
}

export default isoToUTC;