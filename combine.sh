#!/usr/bin/env bash

# Usage:
#   ./combine_ts.sh
#   ./combine_ts.sh ./src/app
#   ./combine_ts.sh ./src/services output.txt

set -e

DEFAULT_DIR="./src"
DEFAULT_OUTPUT="combined_ts_sources.txt"

# CLI args
TARGET_DIR="${1:-$DEFAULT_DIR}"
OUTPUT_FILE="${2:-$DEFAULT_OUTPUT}"

# Validate directory
if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: '$TARGET_DIR' is not a directory or does not exist."
  exit 1
fi

echo "Target directory : $TARGET_DIR"
echo "Output file      : $OUTPUT_FILE"
echo ""

# Reset output file
rm -f "$OUTPUT_FILE"

# Find .ts and .tsx files cleanly
find "$TARGET_DIR" \
  -type f \
  \( -name "*.ts" -o -name "*.tsx" \) \
  ! -name "*.d.ts" \
  ! -path "*/node_modules/*" \
  ! -path "*/.next/*" \
  ! -path "*/public/*" \
  | sort | while read -r file; do

    echo "==========================================" >> "$OUTPUT_FILE"
    echo "FILE: $file" >> "$OUTPUT_FILE"
    echo "==========================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"

    cat "$file" >> "$OUTPUT_FILE"

    echo "" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
done

echo "Done. Combined sources written to $OUTPUT_FILE"
