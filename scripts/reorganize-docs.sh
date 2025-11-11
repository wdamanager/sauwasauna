#!/bin/bash

# SAUWA Documentation Reorganization Script
# Date: 2025-10-24
# Purpose: Clean up and reorganize project documentation

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Base directory
BASE_DIR="C:/Users/moise/OneDrive/Documentos/Trabajo/SAUWA/sauwasauna.com"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}SAUWA Documentation Reorganization${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# Function to create directories
create_directories() {
    echo -e "${YELLOW}Creating new directory structure...${NC}"

    mkdir -p "$BASE_DIR/docs/implementation"
    mkdir -p "$BASE_DIR/docs/reference"
    mkdir -p "$BASE_DIR/docs/archive"
    mkdir -p "$BASE_DIR/scripts/audit"
    mkdir -p "$BASE_DIR/scripts/test"
    mkdir -p "$BASE_DIR/astro/tests"

    echo -e "${GREEN}✓ Directories created${NC}"
}

# Function to move scripts
move_scripts() {
    echo -e "${YELLOW}Moving scripts to organized folders...${NC}"

    # Audit scripts
    if [ -f "$BASE_DIR/audit-mobile.mjs" ]; then
        mv "$BASE_DIR/audit-mobile.mjs" "$BASE_DIR/scripts/audit/mobile-audit.mjs"
        echo "  ✓ Moved audit-mobile.mjs"
    fi

    if [ -f "$BASE_DIR/COMPLETE-AUDIT.mjs" ]; then
        mv "$BASE_DIR/COMPLETE-AUDIT.mjs" "$BASE_DIR/scripts/audit/complete-audit.mjs"
        echo "  ✓ Moved COMPLETE-AUDIT.mjs"
    fi

    if [ -f "$BASE_DIR/check-structure.mjs" ]; then
        mv "$BASE_DIR/check-structure.mjs" "$BASE_DIR/scripts/audit/check-structure.mjs"
        echo "  ✓ Moved check-structure.mjs"
    fi

    if [ -f "$BASE_DIR/mobile-audit.js" ]; then
        mv "$BASE_DIR/mobile-audit.js" "$BASE_DIR/scripts/audit/mobile-audit-legacy.js"
        echo "  ✓ Moved mobile-audit.js"
    fi

    if [ -f "$BASE_DIR/verify-images.js" ]; then
        mv "$BASE_DIR/verify-images.js" "$BASE_DIR/scripts/audit/verify-images.js"
        echo "  ✓ Moved verify-images.js"
    fi

    # Test scripts
    if [ -f "$BASE_DIR/test-graphql.js" ]; then
        mv "$BASE_DIR/test-graphql.js" "$BASE_DIR/scripts/test/graphql.js"
        echo "  ✓ Moved test-graphql.js"
    fi

    if [ -f "$BASE_DIR/test-limit-3.js" ]; then
        mv "$BASE_DIR/test-limit-3.js" "$BASE_DIR/scripts/test/limit-3.js"
        echo "  ✓ Moved test-limit-3.js"
    fi

    # Component files
    if [ -f "$BASE_DIR/BlogStickyScrollSection.astro" ]; then
        mv "$BASE_DIR/BlogStickyScrollSection.astro" "$BASE_DIR/astro/src/components/blog/BlogStickyScrollSection.astro"
        echo "  ✓ Moved BlogStickyScrollSection.astro"
    fi

    if [ -f "$BASE_DIR/src-lib-wordpress-complete.ts" ]; then
        mv "$BASE_DIR/src-lib-wordpress-complete.ts" "$BASE_DIR/astro/src/lib/wordpress-complete.ts"
        echo "  ✓ Moved wordpress-complete.ts"
    fi

    echo -e "${GREEN}✓ Scripts moved${NC}"
}

# Function to create archive consolidations
create_archives() {
    echo -e "${YELLOW}Creating archive consolidations...${NC}"

    # Note: These files are already created manually
    # This function would consolidate if needed

    echo -e "${GREEN}✓ Archive files ready${NC}"
}

# Function to clean up old files (with confirmation)
cleanup_files() {
    echo -e "${YELLOW}Files to be removed:${NC}"
    echo "  - ADJUSTMENTS_TODO.md"
    echo "  - ASTRO_ARCHITECT_GUIDE.md"
    echo "  - CHANGELOG_SESSION_PHASES_FIXES.md"
    echo "  - CRITICAL_FIX_MOBILE_SPACING.md"
    echo "  - TYPOGRAPHY_*.md (6 files)"
    echo "  - CONTEXT_*.md (6 files)"
    echo "  - AUDIT-*.md (3 files)"
    echo "  - WDA-267-*.md (4 files)"
    echo "  - OPCION-*-IMPLEMENTATION.md (2 files)"
    echo "  - PM_BRIEFING.md"
    echo "  - WP_DEVELOPER_BRIEF.md"
    echo "  - PROJECT_CONTEXT.md"
    echo "  - wordpress-graphql-integration-report.md"
    echo "  - backend-implementation/ (entire directory)"
    echo ""

    read -p "Do you want to delete these files? (y/N): " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${RED}Removing old files...${NC}"

        # Remove individual files
        rm -f "$BASE_DIR/ADJUSTMENTS_TODO.md"
        rm -f "$BASE_DIR/ASTRO_ARCHITECT_GUIDE.md"
        rm -f "$BASE_DIR/CHANGELOG_SESSION_PHASES_FIXES.md"
        rm -f "$BASE_DIR/CRITICAL_FIX_MOBILE_SPACING.md"
        rm -f "$BASE_DIR"/TYPOGRAPHY_*.md
        rm -f "$BASE_DIR"/CONTEXT_*.md
        rm -f "$BASE_DIR"/CONTEXT-WDA-*.md
        rm -f "$BASE_DIR"/AUDIT-*.md
        rm -f "$BASE_DIR"/WDA-267-*.md
        rm -f "$BASE_DIR/WDA-270-IMPLEMENTATION.md"
        rm -f "$BASE_DIR"/OPCION-*-IMPLEMENTATION.md
        rm -f "$BASE_DIR/PM_BRIEFING.md"
        rm -f "$BASE_DIR/WP_DEVELOPER_BRIEF.md"
        rm -f "$BASE_DIR/PROJECT_CONTEXT.md"
        rm -f "$BASE_DIR/wordpress-graphql-integration-report.md"

        # Remove backend-implementation directory
        rm -rf "$BASE_DIR/backend-implementation"

        echo -e "${GREEN}✓ Old files removed${NC}"
    else
        echo -e "${YELLOW}⚠ File cleanup skipped${NC}"
    fi
}

# Function to create README for scripts
create_scripts_readme() {
    cat > "$BASE_DIR/scripts/README.md" << 'EOF'
# Scripts Directory

## Overview

Utility scripts for auditing, testing, and maintaining the SAUWA project.

## Structure

```
scripts/
├── audit/          # Performance and quality audits
│   ├── mobile-audit.mjs
│   ├── complete-audit.mjs
│   ├── check-structure.mjs
│   └── verify-images.js
└── test/           # Testing utilities
    ├── graphql.js
    └── limit-3.js
```

## Usage

### Audit Scripts

```bash
# Run mobile audit
node scripts/audit/mobile-audit.mjs

# Complete site audit
node scripts/audit/complete-audit.mjs

# Check project structure
node scripts/audit/check-structure.mjs

# Verify images
node scripts/audit/verify-images.js
```

### Test Scripts

```bash
# Test GraphQL endpoint
node scripts/test/graphql.js

# Test with limit parameter
node scripts/test/limit-3.js
```

## Requirements

- Node.js 18+
- pnpm
- Project dependencies installed

---

*Last Updated: 2025-10-24*
EOF

    echo -e "${GREEN}✓ Scripts README created${NC}"
}

# Function to update gitignore
update_gitignore() {
    echo -e "${YELLOW}Updating .gitignore...${NC}"

    # Add new patterns if not present
    if ! grep -q "# Temporary docs" "$BASE_DIR/.gitignore"; then
        cat >> "$BASE_DIR/.gitignore" << 'EOF'

# Temporary docs
CONTEXT_*.md
CONTEXT-*.md
*_TODO.md
*-TEMP.md

# Archive backups
*.backup
*.old

# Test outputs
test-results/
coverage/
EOF
        echo -e "${GREEN}✓ .gitignore updated${NC}"
    else
        echo -e "${YELLOW}⚠ .gitignore already contains temporary docs patterns${NC}"
    fi
}

# Main execution
main() {
    echo "This script will reorganize the SAUWA documentation structure."
    echo "It will:"
    echo "  1. Create new directories"
    echo "  2. Move scripts to organized folders"
    echo "  3. Create documentation indexes"
    echo "  4. Optionally remove old files"
    echo ""

    read -p "Continue? (y/N): " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        create_directories
        move_scripts
        create_archives
        create_scripts_readme
        update_gitignore
        cleanup_files

        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}✓ Reorganization Complete!${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo "Next steps:"
        echo "  1. Review the new structure in docs/"
        echo "  2. Update any import paths in your code"
        echo "  3. Commit the changes to git"
        echo "  4. Update team documentation links"
    else
        echo -e "${YELLOW}Operation cancelled.${NC}"
    fi
}

# Run main function
main