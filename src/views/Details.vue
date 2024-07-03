<template>
  <div>
    <BtnPreviewPage />
    <BtnLogOut />
    <button @click="generatePDF()" class="btn btn-primary">Generar PDF</button>
    <br />
    <router-view id="pruebaImpresion" />
    <div>
      <h1 class="text-2xl font-bold mb-4">Prueba de impresión</h1>
    </div>
  </div>
</template>

<script setup>
import BtnPreviewPage from "@/components/Navigation/BtnPreviewPage.vue";
import BtnLogOut from "@/components/User/BtnLogOut.vue";
import { useRouter } from "vue-router";

import html2pdf from "html2pdf.js";

import { useBeneficiariesStore } from "@/stores/beneficiaries.js";
import { computed } from "vue";

const beneficiariesStore = useBeneficiariesStore();

const router = useRouter();

const idUser = router.currentRoute.value.params.id;

function generatePDF() {
  console.log("Generando PDF");
  const element = document.getElementById("pruebaImpresion");

  const opt = {
    margin: 1,
    filename: `prueba.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 3 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };

  html2pdf().from(element).set(opt).save();
}
</script>
