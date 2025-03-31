export default function handleUpdatedAssets(
  updatedAssets: any[],
  mutate: (asset: any) => void,
  mutateAccount: (asset: any) => void
): void {
 console.log("updatedAssets", updatedAssets);
  updatedAssets.forEach((asset) => {
    if (asset.type === "investment") {
      mutate(asset);
    } else {
      mutateAccount(asset);
    }
  });
}
