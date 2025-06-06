const kroki = [
  "1. Wybierz poziom trudności klikając jeden z przycisków poziomu (Łatwy, Średni, Trudny lub Masakryczny).",
  "2. Po wybraniu poziomu plansza zostanie wypełniona zakrytymi kartami.",
  "3. Kliknij na dwie karty, aby je odkryć.",
  "4. Jeśli odkryte karty mają takie same obrazki, zostaną na stałe odsłonięte.",
  "5. Jeśli karty nie pasują, zostaną zakryte ponownie po chwili.",
  "6. Na wyższych poziomach masz ograniczoną liczbę ruchów, więc staraj się zapamiętywać położenie kart.",
  "7. Wygrasz, gdy znajdziesz wszystkie pary kart przed wyczerpaniem ruchów.",
  "8. Jeśli wykorzystasz wszystkie ruchy i nie znajdziesz wszystkich par, wyświetli się ekran przegranej.",
  "Wskazówka: Graj powoli i uważnie — każde odkrycie kart się liczy. Powodzenia!"
];

let currentStep = 0;
const stepContainer = document.getElementById("tutorial-step");
const nextBtn = document.getElementById("next-step-btn");

function showStep(index) {
  stepContainer.textContent = kroki[index];
  if (index === kroki.length - 1) {
    nextBtn.textContent = "Zakończ";
  } else {
    nextBtn.textContent = "Następny krok";
  }
}

nextBtn.addEventListener("click", () => {
  if (currentStep < kroki.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    stepContainer.textContent = "Dziękujemy za zapoznanie się z tutorialem! Przekierowanie na stronę główną...";
    nextBtn.disabled = true;
    nextBtn.style.display="none";
    setTimeout(() => {
      window.location.href = "mainpage.html";
    }, 3000);
  }
});

showStep(currentStep);
