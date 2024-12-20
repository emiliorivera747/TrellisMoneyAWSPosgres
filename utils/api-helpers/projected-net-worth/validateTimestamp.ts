export function validateTimestamp(timestamp: any) {
    if (!timestamp) {
      throw new Error("Timestamp is required.");
    }
  }