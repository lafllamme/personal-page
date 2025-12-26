#!/usr/bin/env bash

set -euo pipefail

GREEN="\033[0;32m"
RED="\033[0;31m"
YELLOW="\033[1;33m"
CYAN="\033[0;36m"
RESET="\033[0m"
BOLD="\033[1m"

timestamp() {
  TZ=Europe/Berlin date +"%Y-%m-%d %H:%M:%S %Z"
}

log_info() {
  echo -e "${CYAN}$1${RESET}"
}

log_ok() {
  echo -e "  ${GREEN}$1${RESET}"
}

log_warn() {
  echo -e "  ${YELLOW}$1${RESET}"
}

log_err() {
  echo -e "  ${RED}$1${RESET}"
}

removed_count=0
missing_count=0

remove_path() {
  local path="$1"
  if [ -e "$path" ]; then
    rm -rf "$path"
    log_ok "Removed: $path"
    removed_count=$((removed_count + 1))
  else
    log_warn "Not found: $path"
    missing_count=$((missing_count + 1))
  fi
}

log_info "${BOLD}Clean started at $(timestamp)${RESET}"

log_info "Removing node_modules..."
while IFS= read -r dir; do
  remove_path "$dir"
done < <(find . -name node_modules -type d -prune 2>/dev/null)

log_info "Removing Nuxt/Next build artifacts..."
remove_path "frontend/.nuxt"
remove_path "frontend/.output"
remove_path "frontend/dist"
remove_path "cms/.next"
remove_path "cms/.open-next"
remove_path "cms/.vercel"
remove_path "shared/dist"
remove_path ".turbo"

log_info "Removing common caches..."
remove_path ".data"
remove_path "build"
remove_path ".cache"
remove_path ".vercel"

log_info "Removing pnpm stores and caches..."
remove_path ".pnpm-store"
remove_path "$HOME/.pnpm-store"
remove_path "$HOME/.cache/pnpm"
remove_path "$HOME/.local/share/pnpm/store"
remove_path "$HOME/Library/pnpm/store"
remove_path "$HOME/Library/Caches/pnpm"

if command -v pnpm >/dev/null 2>&1; then
  pnpm_store_path="$(pnpm store path 2>/dev/null || true)"
  if [ -n "${pnpm_store_path:-}" ]; then
    remove_path "$pnpm_store_path"
  fi
fi

log_info "Removing lockfiles (optional)..."
remove_path "package-lock.json"

echo -e "\n${BOLD}Summary:${RESET}"
log_ok "Removed: ${removed_count}"
log_warn "Not found: ${missing_count}"
log_info "${BOLD}Clean finished at $(timestamp)${RESET}"
