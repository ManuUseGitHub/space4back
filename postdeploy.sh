#!/bin/bash

# Colors
GREEN="\033[0;32m"
BLUE="\033[0;34m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m"
CHECK="${GREEN}✔${NC}"
CROSS="${RED}✖${NC}"

start_time=$(date +%s)

# ---- BOX FUNCTION -----------------------------------------------------------

print_box () {
    local text="$1"
    local fixed_width="$2"

    # Strip ANSI colors for measuring
    local plain_text=$(echo -e "$text" | sed 's/\x1b\[[0-9;]*m//g')
    local content_len=${#plain_text}

    # Determine final width (content width if no fixed width)
    local box_width
    if [[ -n "$fixed_width" && "$fixed_width" -gt "$content_len" ]]; then
        box_width=$fixed_width
    else
        box_width=$content_len
    fi

    # Compute padding for centering
    local total_pad=$(( box_width - content_len ))
    local left_pad=$(( total_pad / 2 ))
    local right_pad=$(( total_pad - left_pad ))

    # Generate padding spaces
    local left_spaces=$(printf "%*s" "$left_pad" "")
    local right_spaces=$(printf "%*s" "$right_pad" "")

    # Build border
    local border=$(printf '%*s' "$box_width" '' | tr ' ' '_')
    local blank=$(printf '%*s' "$box_width" '' | tr ' ' ' ')
    echo -e "${GREEN}" 
    echo " _$border""_"
    echo "/ $blank"" \\" 
    echo "  ${left_spaces}${text}${right_spaces}"
    echo "\\_$border""_/" 
    echo -e "${NC}"
}


# ---- SCRIPT START -----------------------------------------------------------

clear
print_box "$(basename "$0") execution" 64

archive="$1"

echo -e "${BLUE}Decompressing archive:${NC} $archive"

# Count files (must use -l listing)
file_count=$(unzip -l "$archive" | sed '1,3d;$d' | wc -l)
echo -e "${YELLOW}→ $file_count files will be extracted${NC}"
echo ""

###############################################################################
# LIVE PROGRESS BAR DURING unzip
###############################################################################

echo -e "${BLUE}Extracting...${NC}"

i=0
spinner=( "|" "/" "-" "\\" )

# Start unzip and capture its file output
# (-o overwrite, -qq minimal noise except filenames)
# Get terminal width
term_width=$(tput cols)
# Fixed length for spinner + progress + label
fixed_len=21  # adjust as needed: "| [91%] extracting: " ~ 20 chars

unzip -o "$archive" | while read -r file; do
    i=$((i + 1))

    # Visual progress
    progress=$((i * 100 / file_count))

    # Spinner frame
    sp=${spinner[$((i % 4))]}

    # Remaining space for filename
    max_len=$((term_width - fixed_len))

    # Truncate filename if too long
    short=$(basename "$file")
    if [ ${#short} -gt $max_len ]; then
        short="…${short: -$max_len}"  # keep last chars with ellipsis
    fi

    # Print single-line live update
    echo -ne "\r$sp [$progress%] extracting: ${YELLOW}$short${NC}$(tput el)"
done
# Extract with progress
echo -ne "${BLUE}Extracting...${NC}"

end_time=$(date +%s)
duration=$((end_time - start_time))
echo -ne "\r${CHECK} Extraction complete in ${YELLOW}${duration}s${NC}$(tput el)\n"                                                                                             

# =============================================================================================

echo -e "${BLUE}Ensure the output directory is deleted...${NC}"
rm -rf ./output && echo -e "$CHECK removed"

echo -e "${BLUE}Moving everything from dist to current directory...${NC}"
mv -f dist/* . && echo -e "$CHECK moved"

echo -e "${BLUE}Deleting the dist directory...${NC}"
rm -rf dist && echo -e "$CHECK deleted"

echo -e "${BLUE}Ensure the .output directory is deleted...${NC}"
rm -rf dist && echo -e "$CHECK removed"
rm -rf .output && echo -e "$CHECK removed"

print_box finish 64
