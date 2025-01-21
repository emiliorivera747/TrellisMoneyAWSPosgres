export default function handleUpdatedAssets(updatedAssets: any[], mutate: (asset: any) => void): void {
    updatedAssets.forEach((asset) => {
        mutate(asset);
    });
}