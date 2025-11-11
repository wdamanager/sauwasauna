# Script de Validación Post-Reorganización
# Autor: Claude Code
# Fecha: 2025-10-24
# Ejecutar después de reorganize-project.ps1

param(
    [switch]$Fix = $false
)

$projectRoot = "C:\Users\moise\OneDrive\Documentos\Trabajo\SAUWA\sauwasauna.com"
Set-Location $projectRoot

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  VALIDACIÓN POST-REORGANIZACIÓN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$issues = @()
$warnings = @()
$successes = @()

# Función para logging
function Log-Result {
    param($Message, $Type = "Info")

    $symbol = switch ($Type) {
        "Success" { "✓" }
        "Warning" { "⚠" }
        "Error" { "✗" }
        default { "•" }
    }

    $color = switch ($Type) {
        "Success" { "Green" }
        "Warning" { "Yellow" }
        "Error" { "Red" }
        default { "White" }
    }

    Write-Host "$symbol $Message" -ForegroundColor $color
}

# TEST 1: Verificar archivos críticos
Write-Host "1. VERIFICANDO ARCHIVOS CRÍTICOS" -ForegroundColor White
Write-Host "---------------------------------" -ForegroundColor Gray

$criticalFiles = @(
    "CLAUDE.md",
    "README.md",
    ".gitignore",
    "astro\package.json",
    "astro\astro.config.mjs",
    "astro\tailwind.config.js",
    "docs\architecture.md"
)

foreach ($file in $criticalFiles) {
    $fullPath = Join-Path $projectRoot $file
    if (Test-Path $fullPath) {
        Log-Result "$file presente" "Success"
        $successes += "$file presente"
    } else {
        Log-Result "$file FALTANTE" "Error"
        $issues += "$file faltante"
    }
}

Write-Host ""

# TEST 2: Verificar estructura de directorios
Write-Host "2. VERIFICANDO ESTRUCTURA DE DIRECTORIOS" -ForegroundColor White
Write-Host "-----------------------------------------" -ForegroundColor Gray

$requiredDirs = @(
    "astro\src\components",
    "astro\src\layouts",
    "astro\src\pages",
    "astro\src\lib",
    "astro\src\styles",
    "astro\public",
    "docs\GUIDELINE",
    "docs\adr",
    "docs\archive\tasks",
    "scripts"
)

foreach ($dir in $requiredDirs) {
    $fullPath = Join-Path $projectRoot $dir
    if (Test-Path $fullPath) {
        Log-Result "$dir existe" "Success"
        $successes += "Directorio $dir existe"
    } else {
        Log-Result "$dir FALTANTE" "Error"
        $issues += "Directorio $dir faltante"

        if ($Fix) {
            New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
            Log-Result "  → Creado $dir" "Warning"
        }
    }
}

Write-Host ""

# TEST 3: Verificar archivos no deseados en raíz
Write-Host "3. VERIFICANDO LIMPIEZA DE RAÍZ" -ForegroundColor White
Write-Host "--------------------------------" -ForegroundColor Gray

$unwantedPatterns = @(
    "WDA-*.md",
    "test-*.js",
    "*.test.js",
    "audit-*.mjs",
    "*-context.md",
    "*-briefing.md",
    "*-implementation.md"
)

$unwantedFound = $false
foreach ($pattern in $unwantedPatterns) {
    $files = Get-ChildItem -Path $projectRoot -Filter $pattern -File -ErrorAction SilentlyContinue
    if ($files.Count -gt 0) {
        $unwantedFound = $true
        foreach ($file in $files) {
            Log-Result "Archivo no deseado en raíz: $($file.Name)" "Warning"
            $warnings += "Archivo temporal en raíz: $($file.Name)"

            if ($Fix) {
                $archivePath = Join-Path $projectRoot "docs\archive\tasks\$($file.Name)"
                Move-Item -Path $file.FullName -Destination $archivePath -Force
                Log-Result "  → Movido a archive" "Success"
            }
        }
    }
}

if (!$unwantedFound) {
    Log-Result "Raíz limpia de archivos temporales" "Success"
    $successes += "Raíz limpia"
}

Write-Host ""

# TEST 4: Verificar componentes Astro
Write-Host "4. VERIFICANDO COMPONENTES ASTRO" -ForegroundColor White
Write-Host "---------------------------------" -ForegroundColor Gray

$astroInRoot = Get-ChildItem -Path $projectRoot -Filter "*.astro" -File -ErrorAction SilentlyContinue
if ($astroInRoot.Count -gt 0) {
    foreach ($file in $astroInRoot) {
        Log-Result "Componente Astro en raíz: $($file.Name)" "Warning"
        $warnings += "Componente en raíz: $($file.Name)"

        if ($Fix) {
            $destPath = Join-Path $projectRoot "astro\src\components\$($file.Name)"
            Move-Item -Path $file.FullName -Destination $destPath -Force
            Log-Result "  → Movido a components" "Success"
        }
    }
} else {
    Log-Result "No hay componentes Astro en raíz" "Success"
    $successes += "Componentes Astro organizados"
}

Write-Host ""

# TEST 5: Verificar imports en archivos TypeScript/JavaScript
Write-Host "5. VERIFICANDO IMPORTS" -ForegroundColor White
Write-Host "----------------------" -ForegroundColor Gray

$srcFiles = Get-ChildItem -Path "$projectRoot\astro\src" -Include "*.ts","*.tsx","*.js","*.jsx","*.astro" -Recurse -ErrorAction SilentlyContinue

$brokenImports = @()
foreach ($file in $srcFiles | Select-Object -First 10) {  # Limitar a 10 archivos para no sobrecargar
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content) {
        # Buscar imports relativos que podrían estar rotos
        $matches = [regex]::Matches($content, "import .* from ['""](\.[./]+[^'""]+)['""]")
        foreach ($match in $matches) {
            $importPath = $match.Groups[1].Value
            $resolvedPath = Join-Path (Split-Path $file.FullName -Parent) $importPath

            # Verificar con varias extensiones
            $extensions = @("", ".ts", ".tsx", ".js", ".jsx", ".astro", ".vue", "/index.ts", "/index.js")
            $found = $false

            foreach ($ext in $extensions) {
                if (Test-Path "$resolvedPath$ext") {
                    $found = $true
                    break
                }
            }

            if (!$found) {
                $relativePath = $file.FullName.Replace($projectRoot, "").TrimStart("\")
                $brokenImports += "$relativePath → $importPath"
            }
        }
    }
}

if ($brokenImports.Count -gt 0) {
    foreach ($import in $brokenImports) {
        Log-Result "Import posiblemente roto: $import" "Warning"
        $warnings += "Import roto: $import"
    }
} else {
    Log-Result "Imports verificados (muestra)" "Success"
    $successes += "Imports parecen correctos"
}

Write-Host ""

# TEST 6: Verificar build de Astro
Write-Host "6. VERIFICANDO BUILD" -ForegroundColor White
Write-Host "--------------------" -ForegroundColor Gray

Push-Location "$projectRoot\astro"
$buildResult = $null

try {
    # Intentar build en modo test
    $output = pnpm build --dry-run 2>&1
    if ($LASTEXITCODE -eq 0) {
        Log-Result "Build de Astro funciona (dry-run)" "Success"
        $successes += "Build funcional"
    } else {
        Log-Result "Build de Astro falla" "Error"
        $issues += "Build no funciona"
        Write-Host $output -ForegroundColor Red
    }
} catch {
    Log-Result "No se pudo verificar build (¿pnpm instalado?)" "Warning"
    $warnings += "Build no verificado"
}

Pop-Location

Write-Host ""

# TEST 7: Verificar documentación
Write-Host "7. VERIFICANDO DOCUMENTACIÓN" -ForegroundColor White
Write-Host "----------------------------" -ForegroundColor Gray

if (Test-Path "$projectRoot\CHANGELOG.md") {
    Log-Result "CHANGELOG.md existe" "Success"
    $successes += "CHANGELOG presente"
} else {
    Log-Result "CHANGELOG.md faltante" "Warning"
    $warnings += "CHANGELOG faltante"

    if ($Fix) {
        # Crear CHANGELOG básico
        $changelog = @"
# Changelog

## [Unreleased]
- Reorganización del proyecto

## [0.1.0] - $(Get-Date -Format "yyyy-MM-dd")
- Versión inicial
"@
        Set-Content -Path "$projectRoot\CHANGELOG.md" -Value $changelog
        Log-Result "  → CHANGELOG.md creado" "Success"
    }
}

if (Test-Path "$projectRoot\docs\GUIDELINE") {
    $guidelineFiles = Get-ChildItem -Path "$projectRoot\docs\GUIDELINE" -Recurse -File
    if ($guidelineFiles.Count -gt 0) {
        Log-Result "GUIDELINE contiene $($guidelineFiles.Count) archivos" "Success"
        $successes += "GUIDELINE intacto"
    } else {
        Log-Result "GUIDELINE está vacío" "Warning"
        $warnings += "GUIDELINE vacío"
    }
}

Write-Host ""

# RESUMEN FINAL
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESUMEN DE VALIDACIÓN" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$totalTests = $successes.Count + $warnings.Count + $issues.Count

Write-Host "✓ Éxitos: $($successes.Count)/$totalTests" -ForegroundColor Green
Write-Host "⚠ Advertencias: $($warnings.Count)/$totalTests" -ForegroundColor Yellow
Write-Host "✗ Problemas: $($issues.Count)/$totalTests" -ForegroundColor Red

Write-Host ""

if ($issues.Count -gt 0) {
    Write-Host "PROBLEMAS ENCONTRADOS:" -ForegroundColor Red
    foreach ($issue in $issues) {
        Write-Host "  • $issue" -ForegroundColor Red
    }
    Write-Host ""
}

if ($warnings.Count -gt 0) {
    Write-Host "ADVERTENCIAS:" -ForegroundColor Yellow
    foreach ($warning in $warnings) {
        Write-Host "  • $warning" -ForegroundColor Yellow
    }
    Write-Host ""
}

# Generar puntuación
$score = [math]::Round((($successes.Count / $totalTests) * 100), 0)
$scoreColor = if ($score -ge 80) { "Green" } elseif ($score -ge 60) { "Yellow" } else { "Red" }

Write-Host "PUNTUACIÓN DE SALUD: $score%" -ForegroundColor $scoreColor

Write-Host ""

# Recomendaciones
Write-Host "RECOMENDACIONES:" -ForegroundColor Cyan
if ($issues.Count -gt 0 -and !$Fix) {
    Write-Host "  • Ejecuta con -Fix para intentar corregir problemas automáticamente" -ForegroundColor Yellow
}
if ($warnings.Count -gt 5) {
    Write-Host "  • Revisa manualmente las advertencias" -ForegroundColor Yellow
}
if ($score -lt 80) {
    Write-Host "  • Considera ejecutar reorganize-project.ps1 nuevamente" -ForegroundColor Yellow
}
if ($score -ge 80) {
    Write-Host "  • El proyecto está bien organizado" -ForegroundColor Green
    Write-Host "  • Procede con commit y PR" -ForegroundColor Green
}

Write-Host ""

# Guardar reporte
$validationReport = @"
REPORTE DE VALIDACIÓN - $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
=====================================================

PUNTUACIÓN: $score%

ÉXITOS ($($successes.Count)):
$(($successes | ForEach-Object { "  • $_" }) -join "`n")

ADVERTENCIAS ($($warnings.Count)):
$(($warnings | ForEach-Object { "  • $_" }) -join "`n")

PROBLEMAS ($($issues.Count)):
$(($issues | ForEach-Object { "  • $_" }) -join "`n")

ESTADO: $(if ($score -ge 80) { "APROBADO" } elseif ($score -ge 60) { "ACEPTABLE" } else { "REQUIERE ATENCIÓN" })
"@

$reportPath = "$projectRoot\VALIDATION_REPORT.txt"
Set-Content -Path $reportPath -Value $validationReport

Write-Host "Reporte guardado en: $reportPath" -ForegroundColor Cyan