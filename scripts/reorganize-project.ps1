# Script de Reorganización del Proyecto SAUWA
# Autor: Claude Code
# Fecha: 2025-10-24
# IMPORTANTE: Ejecutar después de crear backup completo

param(
    [switch]$DryRun = $false,
    [switch]$Verbose = $false
)

$projectRoot = "C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com"
Set-Location $projectRoot

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  REORGANIZACIÓN PROYECTO SAUWA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "MODO DRY RUN - No se realizarán cambios" -ForegroundColor Yellow
    Write-Host ""
}

# Función para logging
function Log-Action {
    param($Message, $Type = "Info")

    $color = switch ($Type) {
        "Success" { "Green" }
        "Warning" { "Yellow" }
        "Error" { "Red" }
        default { "White" }
    }

    $timestamp = Get-Date -Format "HH:mm:ss"
    Write-Host "[$timestamp] $Message" -ForegroundColor $color
}

# Función para mover archivos
function Safe-Move {
    param($Source, $Destination)

    if ($DryRun) {
        Log-Action "DRY RUN: Movería $Source -> $Destination" "Warning"
        return
    }

    if (Test-Path $Source) {
        $destDir = Split-Path $Destination -Parent
        if (!(Test-Path $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        Move-Item -Path $Source -Destination $Destination -Force
        Log-Action "Movido: $Source -> $Destination" "Success"
    } else {
        Log-Action "No encontrado: $Source" "Warning"
    }
}

# Función para eliminar archivos
function Safe-Remove {
    param($Path)

    if ($DryRun) {
        Log-Action "DRY RUN: Eliminaría $Path" "Warning"
        return
    }

    if (Test-Path $Path) {
        Remove-Item -Path $Path -Recurse -Force
        Log-Action "Eliminado: $Path" "Success"
    } else {
        Log-Action "No encontrado para eliminar: $Path" "Warning"
    }
}

# FASE 1: Crear estructura de directorios
Log-Action "FASE 1: Creando estructura de directorios..." "Info"

$newDirs = @(
    "docs\archive",
    "docs\archive\tasks",
    "docs\api",
    "scripts",
    "scripts\tests",
    "scripts\audits",
    "astro\tests"
)

foreach ($dir in $newDirs) {
    $fullPath = Join-Path $projectRoot $dir
    if (!(Test-Path $fullPath)) {
        if (!$DryRun) {
            New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
            Log-Action "Creado directorio: $dir" "Success"
        } else {
            Log-Action "DRY RUN: Crearía directorio $dir" "Warning"
        }
    }
}

# FASE 2: Mover componentes Astro mal ubicados
Log-Action "" "Info"
Log-Action "FASE 2: Reorganizando componentes Astro..." "Info"

# Buscar archivos .astro en raíz
$astroFiles = Get-ChildItem -Path $projectRoot -Filter "*.astro" -File
foreach ($file in $astroFiles) {
    Safe-Move $file.FullName (Join-Path $projectRoot "astro\src\components\sections\$($file.Name)")
}

# Mover archivos TypeScript mal ubicados
if (Test-Path "$projectRoot\src-lib-wordpress-complete.ts") {
    Safe-Move "$projectRoot\src-lib-wordpress-complete.ts" "$projectRoot\astro\src\lib\wordpress-complete.ts"
}

# FASE 3: Archivar contextos WDA valiosos
Log-Action "" "Info"
Log-Action "FASE 3: Archivando contextos WDA..." "Info"

$wdaPatterns = @("WDA-*.md", "*-context.md", "*-briefing.md", "*-implementation.md", "*-audit.md", "*-progress.md", "*-report.md")

foreach ($pattern in $wdaPatterns) {
    $files = Get-ChildItem -Path $projectRoot -Filter $pattern -File
    foreach ($file in $files) {
        # Determinar si archivar o eliminar basado en fecha de modificación
        $lastModified = $file.LastWriteTime
        $daysOld = (Get-Date) - $lastModified

        if ($daysOld.TotalDays -lt 7) {
            # Archivos recientes - archivar
            Safe-Move $file.FullName (Join-Path $projectRoot "docs\archive\tasks\$($file.Name)")
        } else {
            # Archivos antiguos - eliminar
            Safe-Remove $file.FullName
        }
    }
}

# FASE 4: Mover scripts de prueba
Log-Action "" "Info"
Log-Action "FASE 4: Reorganizando scripts de prueba..." "Info"

$testPatterns = @("test-*.js", "*.test.js", "audit-*.mjs", "debug-*.js")

foreach ($pattern in $testPatterns) {
    $files = Get-ChildItem -Path $projectRoot -Filter $pattern -File
    foreach ($file in $files) {
        if ($file.Name -match "audit") {
            Safe-Move $file.FullName (Join-Path $projectRoot "scripts\audits\$($file.Name)")
        } else {
            Safe-Move $file.FullName (Join-Path $projectRoot "scripts\tests\$($file.Name)")
        }
    }
}

# FASE 5: Limpiar directorio docs
Log-Action "" "Info"
Log-Action "FASE 5: Limpiando directorio docs..." "Info"

$docsWdaFiles = Get-ChildItem -Path "$projectRoot\docs" -Filter "WDA-*.md" -File
foreach ($file in $docsWdaFiles) {
    Safe-Move $file.FullName (Join-Path $projectRoot "docs\archive\tasks\$($file.Name)")
}

$docsReportFiles = Get-ChildItem -Path "$projectRoot\docs" -Filter "*-report.md" -File
foreach ($file in $docsReportFiles) {
    Safe-Move $file.FullName (Join-Path $projectRoot "docs\archive\tasks\$($file.Name)")
}

# FASE 6: Eliminar directorios innecesarios
Log-Action "" "Info"
Log-Action "FASE 6: Eliminando directorios innecesarios..." "Info"

$dirsToRemove = @(
    "backend-implementation",
    "temp",
    "old",
    "backup"
)

foreach ($dir in $dirsToRemove) {
    $fullPath = Join-Path $projectRoot $dir
    Safe-Remove $fullPath
}

# FASE 7: Crear archivos de documentación faltantes
Log-Action "" "Info"
Log-Action "FASE 7: Creando documentación faltante..." "Info"

if (!(Test-Path "$projectRoot\CHANGELOG.md")) {
    if (!$DryRun) {
        $changelogContent = @"
# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Estructura de proyecto reorganizada
- Documentación mejorada
- Scripts de utilidad

### Changed
- Reorganización completa de archivos y directorios
- Limpieza de archivos temporales y de contexto

### Removed
- Archivos WDA temporales obsoletos
- Scripts de prueba en raíz
- Directorios innecesarios

## [0.1.0] - 2025-10-24

### Added
- Configuración inicial del proyecto
- WordPress Headless backend
- Astro frontend con TypeScript
- Sistema multiidioma (ES, CA, EN, FR)
- Landing page inicial

---

Proyecto SAUWA - sauwasauna.com
"@
        Set-Content -Path "$projectRoot\CHANGELOG.md" -Value $changelogContent
        Log-Action "Creado CHANGELOG.md" "Success"
    } else {
        Log-Action "DRY RUN: Crearía CHANGELOG.md" "Warning"
    }
}

# FASE 8: Generar reporte final
Log-Action "" "Info"
Log-Action "FASE 8: Generando reporte..." "Info"

$reportPath = "$projectRoot\REORGANIZATION_REPORT.txt"
$report = @"
REPORTE DE REORGANIZACIÓN - PROYECTO SAUWA
==========================================
Fecha: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
Modo: $(if ($DryRun) { "DRY RUN" } else { "EJECUCIÓN REAL" })

RESUMEN DE ACCIONES:
-------------------
"@

# Contar archivos
$mdFilesInRoot = (Get-ChildItem -Path $projectRoot -Filter "*.md" -File).Count
$jsFilesInRoot = (Get-ChildItem -Path $projectRoot -Filter "*.js" -File).Count
$archiveCount = if (Test-Path "$projectRoot\docs\archive\tasks") {
    (Get-ChildItem -Path "$projectRoot\docs\archive\tasks" -Filter "*.md" -File).Count
} else { 0 }

$report += @"

Archivos .md en raíz: $mdFilesInRoot (objetivo: <5)
Archivos .js en raíz: $jsFilesInRoot (objetivo: 0)
Archivos archivados: $archiveCount

ESTRUCTURA FINAL:
----------------
$(tree /F $projectRoot | Select-Object -First 50)

PRÓXIMOS PASOS:
--------------
1. Verificar que 'cd astro && pnpm build' funciona
2. Actualizar imports si hay referencias rotas
3. Commit de cambios
4. Crear PR para revisión
"@

if (!$DryRun) {
    Set-Content -Path $reportPath -Value $report
    Log-Action "Reporte guardado en: $reportPath" "Success"
}

# Resumen final
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "  REORGANIZACIÓN COMPLETADA" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Archivos .md en raíz: $mdFilesInRoot" -ForegroundColor $(if ($mdFilesInRoot -le 5) { "Green" } else { "Yellow" })
Write-Host "Archivos .js en raíz: $jsFilesInRoot" -ForegroundColor $(if ($jsFilesInRoot -eq 0) { "Green" } else { "Yellow" })
Write-Host "Archivos archivados: $archiveCount" -ForegroundColor Cyan
Write-Host ""

if ($DryRun) {
    Write-Host "Para ejecutar los cambios realmente, ejecuta sin -DryRun" -ForegroundColor Yellow
} else {
    Write-Host "IMPORTANTE: Ahora ejecuta 'cd astro && pnpm build' para verificar" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Reporte completo en: $reportPath" -ForegroundColor Cyan