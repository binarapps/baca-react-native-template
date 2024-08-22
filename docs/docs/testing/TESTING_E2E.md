---
id: e2e
slug: /testing/e2e
title: Testy E2E - maestro
sidebar_position: 4
tags:
  - E2E
  - Testy E2E
  - Testowanie
  - Maestro
description: Testy E2E z maestro
---

# Testy E2E z maestro

## 1. Struktura Dokumentu

Ten dokument jest ustrukturyzowany w celu zapewnienia kompleksowego przewodnika po konfiguracji i wykonywaniu testów end-to-end (E2E) przy użyciu Maestro w projekcie BACA. Główne sekcje obejmują:

- Instalację Maestro
- Proces konfiguracji
- Wykonywanie testów
- Wyjaśnienie plików YAML
- Rozwiązywanie typowych problemów
- Korzyści i ograniczenia podejścia do testów E2E
- Najlepsze praktyki

Ta dokumentacja jest zaprojektowana tak, aby była zrozumiała i przydatna zarówno dla nowych, jak i doświadczonych programistów, projektantów UI/UX, testerów oraz innych członków zespołu w projekcie. Każda sekcja zawiera szczegółowe informacje i praktyczne przykłady, aby ułatwić wdrożenie i wykonywanie testów E2E w kontekście BACA.

## 2. Proces Konfiguracji i Instalacji

### Instalacja Maestro

Aby zainstalować Maestro, wykonaj następujące kroki:

1. Upewnij się, że masz zainstalowane Node.js w swoim systemie.

2. Otwórz terminal w katalogu głównym projektu.

3. Wykonaj następujące polecenie:

   ```bash
   yarn install-maestro
   ```

   To polecenie to niestandardowy skrypt npm, który wykonuje:

   ```bash
   curl -Ls 'https://get.maestro.mobile.dev' | bash
   ```

   Skrypt automatycznie pobiera i instaluje Maestro w twoim systemie.

4. Zweryfikuj instalację, wykonując:
   ```bash
   maestro --version
   ```
   Powinieneś zobaczyć numer wersji Maestro, jeśli instalacja zakończyła się sukcesem.

### Konfiguracja Środowiska

1. Konfiguracja Expo:

   - https://docs.expo.dev/get-started/set-up-your-environment/

2. Konfiguracja Projektu:

   - Upewnij się, że wszystkie zależności projektu są zainstalowane:

     ```bash
     yarn install
     ```

3. Konfiguracja Serwera Mock:

   - Sprawdź, czy zmienna środowiskowa `ENABLED_MOCKED_SERVER` jest poprawnie skonfigurowana w pliku `.env`.

4. Konfiguracja Maestro Studio (opcjonalne, ale zalecane):
   - Maestro Studio zapewnia wizualny interfejs do tworzenia i debugowania testów E2E.

## 3. Wykonywanie Testów

### Wykonywanie Wszystkich Testów

Aby wykonać wszystkie testy E2E dla Baca, wykonaj następujące kroki:

1. Uruchom serwer mock:

   ```bash
   yarn start:e2e
   ```

   Kluczowe jest, aby serwer mock był włączony (ENABLED_MOCKED_SERVER) przed uruchomieniem testów.

2. W innym terminalu uruchom Maestro Studio dla wizualnego doświadczenia testów (opcjonalne):

   ```bash
   maestro studio
   ```

3. W nowym terminalu wykonaj wszystkie testy za pomocą następującego polecenia:

   ```bash
   yarn test:e2e
   ```

### Wykonywanie Pojedynczych Testów

Aby wykonać pojedynczy test, użyj następującego formatu polecenia:

```bash
maestro test <ścieżka-do-pliku-yaml> -e APP_ID=host.exp.Exponent --debug-output=./e2e-debug-output
```

Zastąp `<ścieżka-do-pliku-yaml>` konkretną ścieżką do testu, który chcesz wykonać. Na przykład:

- Aby wykonać test logowania:
  ```bash
  maestro test .maestro/auth/login-with-validation.yaml -e APP_ID=host.exp.Exponent --debug-output=./e2e-debug-output
  ```
- Aby wykonać test formularza pełnoekranowego:
  ```bash
  maestro test .maestro/home/full-screen-form.yaml -e APP_ID=host.exp.Exponent --debug-output=./e2e-debug-output
  ```

Upewnij się, że jesteś w katalogu głównym projektu podczas wykonywania tych poleceń.

## 4. Wyjaśnienie Plików YAML

Każdy plik YAML w katalogu `.maestro` reprezentuje konkretny zestaw testów E2E. Oto wyjaśnienie funkcji każdego pliku:

### logout-when-needed.yaml

Odpowiada za wylogowanie użytkownika, jeśli jest to konieczne przed wykonaniem innych testów. Obejmuje:

- Zatrzymanie i ponowne uruchomienie aplikacji.
- Nawigację do ekranu logowania.
- Wykonanie przepływu wylogowania, jeśli użytkownik jest uwierzytelniony.

### login-with-validation.yaml

Zawiera testy procesu logowania, w tym walidacje wejścia. Testy obejmują:

- Weryfikację widoczności elementów ekranu logowania.
- Testy walidacji adresu e-mail i hasła.
- Weryfikację udanego procesu logowania.

### details.yaml

Testuje funkcjonalność ekranu szczegółów, w tym:

- Nawigację do ekranu szczegółów.
- Interakcję z konkretnymi elementami interfejsu użytkownika.

### full-screen-form.yaml

Testuje formularz pełnoekranowy, wykonując takie działania jak:

- Wypełnianie formularza.
- Nawigację przez różne sekcje formularza.
- Wysyłanie formularza i weryfikację wyniku.

### settings.yaml

Testuje funkcjonalność ekranu ustawień, w tym:

- Zmianę motywu aplikacji (jasny, ciemny, systemowy).

### logout.yaml

Zawiera test procesu wylogowania użytkownika. Obejmuje:

- Wylogowanie użytkownika.
- Weryfikację powrotu do ekranu logowania po wylogowaniu.

### config.yaml

Konfiguruje globalne wykonanie testów, w tym:

- Kolejność wykonywania przepływów testowych.
- Włączenie konkretnych tagów dla testów.
- Konfigurację kontynuacji lub zatrzymania w przypadku niepowodzenia.

## 5. Rozwiązania Typowych Problemów

- **Problem z trwałą sesją:** Plik logout-when-needed.yaml odpowiada za automatyczne wylogowanie, jeśli ekran główny jest widoczny, unikając problemów z poprzednimi sesjami.
- **Niepowodzenia w walidacjach logowania:** Plik login-with-validation.yaml został zmodyfikowany, aby zawierać dodatkowe weryfikacje. Upewnij się, że ID elementów interfejsu zgadzają się z tymi określonymi w pliku YAML.
- **Problemy z językiem:** Aby uniknąć problemów z wyborem tekstu przy zmianie języka, zaimplementowano identyfikatory (testID) zamiast tekstu dla elementów interfejsu. Na przykład, użyj `testID='sign_in:submit_button'` zamiast wybierania po tekście.
- **Synchronizacja z serwerem:** Serwer mock zapewnia szybsze i bardziej niezawodne wykonanie testów, eliminując błędy wynikające z braku synchronizacji między startem serwera a natychmiastowym uruchomieniem testów.
- **Problemy z koordynatami ekranu:** W full-screen-form.yaml używane są konkretne koordynaty dla niektórych interakcji. Upewnij się, że używasz tego samego symulatora lub urządzenia, aby zachować spójność.

## 6. Korzyści i Ograniczenia

### Korzyści

- **Wczesne wykrywanie błędów:** Pozwala identyfikować problemy na ekranach, które nie zostały bezpośrednio zmodyfikowane, zapobiegając regresjom.
- **Automatyzacja:** Możliwość uruchamiania testów w tle podczas wykonywania innych zadań programistycznych.
- **Zapobieganie błędom:** Pomaga wykryć problemy przed commitowaniem, co poprawia jakość kodu. Na przykład, podczas refaktoryzacji formularza testowego, ukrycie komunikatów o błędach może spowodować, że widoczny będzie tylko czerwony prostokąt zamiast wiadomości o błędzie. Ponowne uruchomienie testów może ujawnić problemy z wielokrotnym użyciem komponentu, co narzędzie pomaga zidentyfikować, zwiększając niezawodność kodu.
- **Żywa dokumentacja:** Testy E2E służą jako forma dokumentacji, która jest aktualizowana wraz ze zmianami w aplikacji.
- **Kompatybilność z Expo Go:** Maestro działa z normalnymi aplikacjami już zbudowanymi na urządzeniu. Oznacza to, że możemy pominąć powolne kompilacje natywne, używając Expo Go z `yarn start:e2e`.
- **Skalowalność:** Zdolność Maestro do obsługi dużych zestawów testów bez znaczącego spadku wydajności.

### Ograniczenia

- **Czas rozwoju:** Tworzenie i utrzymywanie testów E2E zwiększa początkowy czas rozwoju.
- **Kruchość:** Testy oparte na UI mogą być wrażliwe na zmiany w interfejsie, wymagając częstych aktualizacji.
- **Problemy z lokalizacją:** Mogą pojawić się trudności z wyborem tekstu przy zmianie języka aplikacji.
- **Ograniczona symulacja:** Niektóre funkcjonalności, takie jak zapisywanie danych profilu, mogą nie działać poprawnie z serwerem mock, ograniczając zakres testów.
- **Ograniczenia w funkcjonalnościach zaawansowanych:** W przeciwieństwie do innych frameworków (np. Detox), Maestro może nie obsługiwać niektórych zaawansowanych funkcji, takich jak manipulacja urządzeniami fizycznymi lub integracja z zewnętrznymi API w celu uzyskania bardziej realistycznych symulacji.

## 7. Najlepsze Praktyki

1. **Regularna konserwacja:** Regularnie aktualizuj testy E2E, aby odzwierciedlały zmiany w aplikacji.
2. **Używanie unikalnych ID:** Stosuj unikalne testID dla elementów interfejsu, aby uczynić testy bardziej odpornymi.
3. **Testy atomowe:** Projektuj testy, które są niezależne od siebie, aby ułatwić debugowanie.
4. **Kontrola wersji:** Dołącz pliki YAML Maestro do kontroli wersji wraz z kodem aplikacji.
5. **Dokumentacja:** Utrzymuj tę dokumentację na bieżąco z wszelkimi zmianami w procesie testowania lub konfiguracji.

### Dodatkowe Uwagi

- Pracujemy nad poprawą walidacji na ekranach takich jak ProfileScreen.
- Planujemy wdrożyć więcej przypadków testowych dla funkcjonalności takich jak rejestracja (Sign up) i walidacja haseł.

Aby uzyskać więcej informacji na temat Maestro i jego wykorzystania w testach E2E, zapoznaj się z oficjalną dokumentacją Maestro.
