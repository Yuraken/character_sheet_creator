<template><div> 
    <Form v-slot="$form" :initialValues="initialValues" @submit="onFormSubmit" class="grid lg:grid-cols-2 gap-4 w-full">
      <div class="flex flex-col justify-center items-center gap-4">
        <InputText name="username" type="text" placeholder="Username" class="w-full sm:w-56" />
      </div>
      <div class="flex flex-col justify-center items-center gap-4">
        <InputText name="Level" type="text" placeholder="Level" class="w-full sm:w-56" />
      </div>
      <div class="flex flex-col justify-center items-center gap-4">
        <Select v-model="playbookSelected" :options="playbooks" optionLabel="name" placeholder="Playbook"
          class="w-full md:w-56" name="playbook" />

      </div>
      <div class="flex flex-col justify-center items-center gap-4" v-if="playbookSelected">
        <Select v-model="manoeuvresSelected" :options="manoeuvres[playbookSelected.value]" optionLabel="name"
          placeholder="Playbook" class="w-full md:w-56" name="playbook" />
      </div>
      <!-- <Editor v-model="skill" editorStyle="height: 320px" /> -->
      <Fieldset legend="Form States" class="h-10 overflow-hidden">
        <pre class="whitespace-pre-wrap">{{ $form }}</pre>
      </Fieldset>
      <vue3-simple-html2pdf ref="vue3SimpleHtml2pdf" :options="pdfOptions" :filename="exportFilename">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlAIQgSoaymXgA9sIgAICgaaUdxa7-jcyNqQ&s">
      </vue3-simple-html2pdf>

    </Form>

   
    


      <!-- <img src="base64 image or url"> -->

      <!-- You can loop to display page number as you want -->
      <!-- <div class="html2pdf__page-number">1</div> -->

      <!-- Break page pdf -->
      <!-- <div class="html2pdf__page-break"></div> -->

    
    <Button label="Toggle Dark Mode" @click="toggleDarkMode()" />
      
    <Button label="Télécharger ma fiche" @click="pdfDownload()" />
  </div>


</template>

<script>
// import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { Form } from '@primevue/forms';
import Select from 'primevue/select';
// import Editor from 'primevue/editor';
export default {
  name: 'CharacterFormular',
  props: {
    pdfOptions: {
      margin: 15,
      image: {
        type: 'jpeg',
        quality: 1,
      },
      html2canvas: { scale: 3 },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'p',
      },
    },
    exportFilename: {
      type: String,
      default: 'my-custom-file.pdf'
    },
  },
  data() {
    return {
      // Initialisation du tableau 'value'
      value: "test", // Exemple avec quelques éléments,
      initialValues: { username: "test" },
      playbooks: [{ name: "yakuza", value: 0 },
      { name: "Policier", value: 1 }],
      manoeuvres: [
        [
          { name: "Flatter", value: 0 },
          { name: "Divertir", value: 1 },
          { name: "Charmer", value: 2 }
        ],
        [
          { name: "Flotter", value: 0 },
          { name: "Drov", value: 1 },
          { name: "Chorb", value: 2 }
        ]
      ], playbookSelected: null,
      manoeuvresSelected: [],
      skill: null
    };
  },
  components: {
    InputText,
    Button,
    Select,
    Form,
    // Editor
  },
  methods: {
    toggleDarkMode() {
      document.documentElement.classList.toggle('my-app-dark');
    },
    onFormSubmit() {
      return true;
    },
    pdfDownload(){
      this.$refs.vue3SimpleHtml2pdf.download();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ff0{font-family:sans-serif;visibility:hidden;}
@font-face{font-family:ff1;src:url('data:application/font-woff;base64,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gY2cymmczhls4kzO4myGOYdzOY/zuYALuYjNXMwlbGErl3IZl3MFV3IVV3MN13Id13MDN3ITN3MLt7KN27idO7iTu7ibe7iX+7ifB3iQh3iYR3iUx3ic7TzBkzzF0zzDszzH87zAi7zEy7zCq7zG67zBm7zF27zDu7zH+3zAh3zEx3zCp3zG53zBl3zF13zDt3zH9/zAj/zEz/zCr/zG7/zBnyOXbNo8vHh45lA/qn54P1I/mn7kfrT96PpRRvV3hmLVsVKsJlaO1caKKx5XvIoV9zzuedzzuOdxz7t+1XGvjnu1x4rLdVyu43KKz6X4XAqtiXcb/S7cHG4ON8c3ctzL4eZwc9zL8UQ5/kJtfLeNd9twS7glPlfCKGGUMEpcKbpSRsd/dUiz0nTNWjNpNppZs9XsNKVV0ipple5WulvpbqW7le5Wuuu667rregrXU7g0l+bSXJpLc2m1tFpaLa2WVkurpdXSamm1tFpakpakJWlJWpKWpCVpSVqSlqQ10hppjbRGWiOtkdZIa6Q10hppWVqWlqVlaVlalpalZWlZWpbWSmultdJaaa20VlorrZXWSmulddI6aZ20TlonrZPWSeukddI6aUVakVakFWlFWpFWpBVpRZqq4aqGqxquariq4aqGqxquariq4aqGqxquariq4ZW0Sppa4mqJqyWulrha4mqJqyWulrha4mqJqyWulrha4mqJqyWulrha4mqJqyWulrha4mqJqyWulrha4mqJqyWulrha4mqJp/QPqG2ovQAAAAH//wACeJxjYGRgYOABYjEgZmJgBMLvQMwC5jEAAA47ASYAAAAAAAABAAAAANtj/TYAAAAAwEoQegAAAADjbJtH')format("woff");}.ff1{font-family:ff1;line-height:1.076172;font-style:normal;font-weight:normal;visibility:visible;}
@font-face{font-family:ff2;src:url('data:application/font-woff;base64,d09GRgABAAAAADakABIAAAAAetQAAgAHAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAA2iAAAABwAAAAclU9fDkdERUYAADMoAAAANAAAADYIfwwIR1BPUwAANlQAAAAyAAAAQCOcJJ9HU1VCAAAzXAAAAvgAAAb0hO2a5U9TLzIAAAIMAAAAWAAAAGBL4FFYY21hcAAAB/AAAAIqAAADWlgHOJpjdnQgAAAT+AAAAKUAAADePJEj8GZwZ20AAAocAAAIFQAAD4NXiw8QZ2FzcAAAMyAAAAAIAAAACP//AANnbHlmAAAVMAAAChMAAA6UxwIkvWhlYWQAAAGUAAAANgAAADYc5L2vaGhlYQAAAcwAAAAfAAAAJApnC1VobXR4AAACZAAABYsAAA7+LwEUDGxvY2EAABSgAAAAkAAAB4om+yOQbWF4cAAAAewAAAAgAAAAIAbyAMBuYW1lAAAfRAAABEUAAApLqOtjrXBvc3QAACOMAAAPlAAAK8rJnSnscHJlcAAAEjQAAAHBAAACQzk4CUQAAQAAAAIR7PzzVplfDzz1AB8IAAAAAADWfsaQAAAAAONsm0f9gv5PBkMGoAAAAAgAAgAAAAAAAHicY2BkYGBb8M+fgYHT628TkO3MABRBBsy7AWzrBM8AAAEAAAPEADUABAArAAMAAgAQAC8AmgAAAnoALgACAAF4nGNgYbFinMDAysDBasxyhoGBYSaEZjrDkMaUB6S5WZlYgJCJeQED03GgPBMDFPgGKygwHGBQUDJjW/DPn4GBbQHjRgUGxvkgORY+1nVASoGBGQCO+A3JeJytV31olWUUP/d9nue9s6BUBn0sVihTGbFiRFaaxoiQm8WcNOp6kyKDWHk1jXAjawwJDC3wj0vYpJtBRSwSWVa2vpgNhTUWrMBSiBEUViPTZh9q/c5zzr3v+95tbZEXfpzzPp/n+zk3+IluJ/yCN4GFRO4ZYDH4A9QLVNubaUfqC9pqvqQiU9tGBazN2iVASHlbQ1v8/MNEpgfYQJS+msiepoJbTr32CNAOFKjXNVHBjmHffqrFXgrWYF0TzshS0ZylLtsMZKgr2E7Nnm+nYhAAdVQdtFAxPEpFHrM5zGEPrzFtoAvpzqAbezaDJ2q082mpOU6NZhxn3YA7rsJdTLsh35XQrwC+QajpwNwJfN+i8vRjfBv4O8CnVb6MyOWBu80xjOMuPhPykVvmv8myHXeA5nAuaOoxgVmkwF0Geqd+B3CXaQVuZeufXwLglHNd9D9//s5h4FecvQ84C/nqRaaqe8GfiKib5iz4i2BjCgeA6/Hd4O1xwak9DGT+Oy3bX/WbMW0BXTcDqn51g6Dj01OOacRdgpb41HrEKHzisZjy6ddEnjS+3V3iM9eHHGkQu8wE6WE5w32De04l4TYoblN6Uu02HR5Seh/wLPZdW4E8YuEStf00sBdj/bwIthDDLzhnKcZ3T4H6KdAS8V5P5asQzPYvAdevOOzPE+FS8MvXSbC/p8TgxDHUMU85P+xzkb89WN9sEl7mpukR9sh6zt047N1qR+SkvV+RmRymP/bdHMMLkjP/BtT2MoJVwEmlgN0yCXIVWBfxXm7lw0HVqy2CXTAJHsdcNe7rFvjaWonxiWNcozjXfO7VgP4Wge8PPgX6NH+uEH+YMxHcSDIX0ngT7XsVcfl+LKY/1BjOaxzmNQZPSTzZUUHYKvHhuFYN4dxHgAHdBz3dq1jzNmK4TuBjVPM4nksh3q50RmN8SOs41+eXRKeQa/q3WHMIa94Ff0BjTvWpgv72Hanr6T9Vt7WqC2RyfwPQOTyItZvAfw4cielTim1+Dxox94DqtAI4I2BZ2W6O34tjquNOWReuSdYulonzkFGydcLesbz39hiNwOexz9hurBO/7d7G14lNvB84n/Dm2tVY+2gEd1EyVxzuNEMV9ekjoFbBPdFsvSOnVPPTBlHMuQ/wPR/oBH6AbHjzw13gnwYQJ/Z70SvcLD7jWC/ldjn/2P/oHcIbQVcKz2+1vQf0K1CuN2g0bC8o+hTzMsZ7VK45gvQ5jH8GfiPWVIFn23apLuhr3OWig/sY8+PK74z04T7GA7q41apPp+Q672Wwn9lufvx1tckh+XY3UbKWTWJr7o/Kto7VDm+P47E87lSf7VadLhO5vKyr1A9/gP6ofj8KavVtfELyxsec5rrvOQ7LvlLeel3maQ6V3qRsMqfNG1EOlPNZ88s9BbyIceRBgLxyY8CA+NDnLufMNonFUlxbtks7+Fq1K9f1RjnT0/qolrBM8bfd4N2xnL/oue0u0cXWqf247s+mcl0OuJfhWs5y9GuMrJA51xaL40+Aa4CtGG9Vu0FGNyxnlMDzZeRknmXw9+LO4LTaqVDxduVERsO17aDM+z5ro/iD7wx53XeRTJwLfm9W84/Hz8t94VqxZ+pB8Oxnth9i2HIPXyNxE+zFPL9dzO+Tt8StB9jur+AsfmfQ46fYnvz/p15gcYfBmWalzmtPzbyBr4NRRVaA/yVknxRqOEedIOhQPB+h3J8rggVSy71fR2J+RpzYPQDib1ZGalbI/1G2Y+wtfF9Kvh/zvcwmrT19Uhd5r0NfGXJPg/8aDrXMzVXgzZi1HGu479wr+cL7Sj1QOKbxGpdnj9zlz5oray7Ej/+jTPjPMaJ52Kqxwf1Ac6xGx998zp1lEnesa6Lmar31dbRDatHE3z9TJNaYAHiczdLfS5NRGAfw73vOtsrsd1lqvr2bObesNTN/VGqWKZkWlCEVZZNuLAq6qAiJCrWLCopWl111EQQiCFHRrBVEsl0IEaWl+/EyqOwqIqyYp6ezd3OM/Ac68DzvOQ8Ph8/LeQBwJGMlFJnB9suTYpxNrEp+r+EyLMiCBjuccKEUZajEZtSiDo1owV60og3tOIFz6MIFXMQD9GEAj/AEI4jiK37gJ+KKUznOjrEedp152SAbYgH2gYW4iWfzfF7IHbycN/Cz/AqfNF0yXTUXqI/VgBpTJ9XfWq5m09ya35pjtdkqiKRJQxEcKIHbsGxCtbTUZ1g8OInzhuW+tPTjYcryJWVxKJ1pi4+9lpZRNsbBLYbFbljO8F5p6TJ1m/PUe+pTdVj9pP6SFi3TQjGKUJhCNE5jNEoj9J7e0VsapiAFaIhekJ+e0zMaJB/dIS/dopt0g05TJ3XQAWqjVir+MyG+iTciKF6Ju+K28Ipe0SM6hEfsE82iSdQIl8DU96nuOMVF/JQ+oX/WY7quR6Mvo75of1SLBCP+cF/y7f6XpViQBilMJvZvQ3LkYDLDMguz52TNRfY8zJeVBVi4CIuXLMUyIGf5ilyjPS+R8uVEoiB1gYpVmtVWuLrIXuxwYk3J2nWu9e7SDWUbUV5RiSo5EtNrp5F3NTVPF1oSaQ/GtgFbQg3YWqPXVydK22XsyETWzvyxj7vT23EZ4RkNB4/WHT6CRk/7ob8pHMmRAAB4nI1X3W/cxhFfUvd9p+BsBK4BqugSWxIBKOethawaCaHTnfXR2ifd2SFluyGPJ9lKk9hJW8tpolZ169rYvrfuf7G0X6Q8xQ/5Y/JXqL/Z5Z0+4AYlluTOx87Mzs7M7oZr/3n57389/8ezv//t6V8P/vLn/W++/tNXT/Ye//EPv//yi0cPP//s0999svvg/s72OBulyce/vXf3zlYcfXT71nCw0b954ze/Xl9bXbnee+9n7UZ93sqbjY7obDeuzLO80US3eWXeUpWOqmqkuhlwFW5E7vpm1F12XDd2hKtCVfK69KZjmU0IMURgFMZCxPpArG9sRbwrE00EZngGMvSFKa3oKbszjFQvAHQKvq7hKbhyjrw6IQuuWF/Kcc5mPOBDJ7d0p9z5Z4yZxEKNAuGKaBu8eY213GHSQa816Vn8OiTywzYb4c0+EodW0duKFE924hVwM9tTug0O2S/EE9NPFM84VxVPjPqRdJWVCKeANyN4zEod6QqXx/Hh8Zs54hYuZNlsKRfWi408tF4MtqKjNmP8xTB6ZVt2J1mK85+DFh1xxkKNtQlLSAI4AWzdwsq8smua3zkKGTvQ1JJGaDjDLDSuNsFZLDu0Da5tFPlaUchsUEqGEk64S8DVDO7AcL9XcNdAaRPlW2ZbjGmieeAlrEzYKIe1sB627Fkba0GoV8B8C966xV63rFnLySFzU6MPrYO8HjpHWtJmwXkATsIdTHGwnNhOCYI+M/FbJzO4tRW9bjHI119wLNFzZb6b2zcCcRLWGxFWr5tbN4IEoU3gjNflCGsVDiLiTRzEPKJ7+co8RRePxLYj4vzdd+Wjbt5ud9ZlB4GMWNMBlqcVPwmkCTkKNNFeRJjOeKuZ6CVgEUgbtFWgsts8UaMkQJe3e7JHUZESN7uU2zNebpU86wP2AfxWaamG2F5STbE0pXzIPjSUClGqYklZl4zXu6LLL+/KTIwQgWE/uu/sxClkq1CkqiSWnLzElpAvly1MqZuzGwHmto4YvBn07yBJyRlcymWehyU/zVKCl13kvSxIYnk5PjWiy6UK0ywBRzfWzMhEILsi5WN4GdOF5wYC3a0tGjPcimRrLMYCHg5DmWLaDs9iR8aZ9jjGwzR2Zb58Up2K4mRTznvZDj6HnI0SMTIIys7zuPvnETvgOo0Ta6RO/y39l2uiOwYHvelYzSDiXD6OTciwvq4b/5PJOsXEsaZauGz/agJZBQQATar7Z8EHU7BHbwKvvW9iRZV8irzIVZ846tM4mLKk6mDEJW+LRUEfPfg6vYkqo3OQpVScKhR7QKwBwaMRYhkCe4mcRByGlfypJvV5cEYkSqo1hGrbo+mogz5PYp4kwCJ7XIerMv58J6XgorLbN/Ppo/bjl8oBxjJKIEdVsQPspNvCRbVWlLTG+2RjCdaxQaSYI6WQyoKJXg/MEO+rir9KP7RHgUi3sYikj6fbemwP5mrvkDSnK9wYLLanfQnHoVqM6JNJRKO6h2wrexfkRcmvSlSteyi4JT+7nWBb4G3e43qpU0QyOWGVoBiCDGPdI0aM181XnwX5vap3gtHtYWCYa1oqLNuMVH/CUtUNnS8CZf9kAUSavLWJ+lHSC0XOK3urcG+IqHJoNFf2MCqWR49fpaHOZMHMMGB02aVt0Z3Y2zT2GqUV3Vq61T1V87DQqgQbDLlK0zkJAvRhtBkzo801E0AfqnhB0RNJCqDkbes5me2QU/nEQSEV9DqHx9/1USMTQW8ck/qaVkQjtGhpBJO7KkR8mysKTaY1qa3qKZxGN3SrapuJZqZUPuv4wntHx98x4zm3eChmaJbPi6ws8m7bUQ/iYGxGVYoKzlFRUbmzDX3auINsEG4VdQzTR1ZxNQiwiei5PTdeXTPVgaLS6gnWQwwVHXaJKSZWLPowpJZYUTbAaU+8splVEwv0q4uF3LaqqPZUjNqzLRR6mSVjs1HDy2zBuUZHo4pe6Lpe28dUmoZR2SnFOmR8tRcUUWy+j4MpfY9ysjrxZI1ockosa3F7Jjb84vs4qL11lKz9f8pqxWqquqZRNfJrP65qxizQmlmuNdtIXjN1Alg/k5JKW37vHcrQln8B+Isw7SqMvFpYCd98A1P6pLqmMRpEulXJHLNsXhOENnjfmNBugtiGNW8cw4V2dHzMHgcTbuME2N3wTJwX5GK0ic69IEavR28Clh69RSY1iyxtnav6hXizpvWzRDEVRhu9mEokKLdaOAOXnDI0+rwNdy1qf/owFbBczK2qXzCUicH2FqVsTuo/lf8jHECZPlyyWJ5HqH2sB9Z69u2U2nnsrEYXqzw7/ROySIdGRzU7dH6hvalOAfA+1nf/+6Lm6OPEKcdoFKXiaexl8n11UhIeBpOxE7/t6JQuxp7DDqN9YMlT39NOoiz8y75Lr0Ou09ooxh8GxUF3n1b3qRb3NOB8F+esjoXTFjbKXdqqOHHXfF3kJA48u2mq65C+xlzGWWqTTse4AYg2t66xa+YyJIp7BvaAkhddc67GuFccHv8wF5tSZWOTxzuUnLcvgCT5RVw01DPt3oImNA67eMUvuGgGz5Ccho+sb9lyfQAn0I2sseA06JY3uWC9DH6MzGk8qpT6WDxxyRXqtvgKh4WOUJzfRUkE8vpcLCW2UynoJnU7Ml8iWfNzdDKgU0zB68zhjnYCtuYo3NLD49dzdF2aavt6ou1LaKOOnKhT2Vu1UZRZd0ysoWnz818yYfSX/EKpvCu3cD901U9JcWEHwHfmYi0BlrwkS/4L2zBo7QAAAHicVUrLchJRFJwBQjCihbHkDQ0ZmACXQASMGsGMxDERVELIRS4g4hNfK1Yu2ViVTVKpymewGVzpR8w3HQETLU7X6e7TpzX6lq/ga57wpUD4XBjjU44wyJ3jY66GD7cJ7zMm3mUIb6f6JkvoZ0283iT0MgpepQfopgmdqbY3CIIRWqkmXqYIzdQYPLWFoyShkRzjMDlEPTHCQYJQS5h4sU54rtbwTCVU1QoqagJP4yPsT3dP6eGJQtBjhMexAXbXCOUo4VG0By0ywk6E8BAmSiAU0cSD8BjbYcL98AD3QibuhghbwRHuBIco5MfYzPaQzQyxkWZYV1WogRLiASdi54r2nSt+wpo/hqiPECl43V14hwh7CKFtj7sbdDsQKPr6HW/R3e/4Z84zc7d8O25q39RX+Q3dxVeFS1wrOflSycadwiau6it8Wbfz62JF2IUkrugObtUt3CEswiVZNW1J/i2fSUes+muZDquG46BjyMdGvDFjrd427MeGxNud1kSWT8WPkxMpVK4aZ43WT6s0tWJisezWWxOb9VSUJSYxxqQLsAWWFyCxS2Hz39/GvMwus//+4v4XzJuL7+l4/wCKS5FkAAAAeJwtjL8KgnAUhb8h18RXirbGNqGxscdpDAqCQPpHIWRklA5GWhCFrxGNLdr5mVwu955zz/2spaXCVjuNJjaUn7rfhVu45vbXZNyIVBlnVUczIiDVnHIqv/RZVyqWP1PW58iOBTkeobYWXV0f2iIu8gPdU55iGcJK2rB7DBgykT5wJZHzYq//uE7cxfarZM6YOVvxQulEeiSOx0aOIbct5wdUGE6WAAAAeJxjYGDQQYJeDBkMdQw9DLMYljFcYnjCqMZow1jEWAeHmxjvMP5hEmPSYEphWsd0BASZGZhNmJOYpzGfYH7CosXiw5LAUsMyheUMyztWCVY/1hbWZawv2NjYtNjs2FLY2tjmEYSr2LaxHWI7x3YLCJ8RBb+xs7FLjCioBoYmSNBrFI7CUTgKR+HQhAC9sTW8eJydVwlQU3ca/3/vvSQy3SYGCGit1AdCRCqRhMCuxRNGdK0VdcEKgiCC3IdyCRUsAopL1a2itLbdKOJRGTzK1FqPSmor0rSiK1FbrdYeo7XH1Gm7LpA/+/3fC1ndYbs7O5m8l/f933f9vjOEI1GEcMsVsYQnKhJ8BIgh4qhKyP3eeESpuB5xlOfwJznCM7KCkY+qlHn9EUeB0U1aUesvasUobgwdC000QxHbezBK+JgQAqSdnuN2K2eTx/EhgNMOdw/3VnI6T3dvzuvo4cNHG3Zs376DnuuAmyDi52ZH1X6a3NtLkw8gryfycjKvhz7M3RzK6cO93LXDOYvE1oAC6LnKA2Dp7QXL/qoOKtKb+BHRFdIAw/hjQqjkD/EQdSJo/bQNfFB/D/R9xA1Y4e/9l/mniWTjGtoOC4kd3yUeWpN2jZ22c770pHRmgf38VC5LOkMpFu6vjhQuyyrz4cXJZzKbdGvsdjthurcP/MRfVpxBu0cRovANMGtDw0xGL53WU6k3huFTgJ+vEp+8OHP3hUsff3Lx4icFqakF+NXcPM01dlz/zOrI7rhuLU7nGlcUFa1wZKcXM33xePlF0UaUeEdvVOZw+MV24YKirXeB0F31t43SO6j7kOIUCWGag0EfYgrxAZMxbDKEBgSB2fkL9atC/EKm4InXaPBUqnyA3Th1xfGC4d3qsqS0gqyUFSviElMT5mZ7XnjqSsvJT0pyStd9qlm8vyxpUc6yp3NLremJE+KSFiW1f/Bh+4jcXQEjj7004r1LzIY8QvgatHMYPujAD0Sdn5avoRuuQindbFO0vd03TPjuImxlWJXhu81oryfxJUQElRr8fAPQxLBBy8DDZTI+e0EQ5MET6ZGvn+np6LgcaqRdquTMzOSUzEzu0ljD+LsdcPnuvSuw+EKq4y+8proEVlVWFkHJi2RgQI6XMMI9gDxGyHAVu/Iz0F6Ml1CLNoyVMcMAMWB8wBshCuacsULkwhFMNcdtafqqsvKrpsqLL4286LG4bFpdc3Pd0v2jL47c1K1Z/3MzbN7z8/oca/XMzEmndtLCnSfLCqutOczXdkKEA4iLJxmBvppFZy7grzEEVaDrIqYfTIHZliNHLPQYRIIKxOoHh2iozbqvCVqb9lnpjw/o8pa7FSzoKE6SGY8yWZ4/RjSYiSjCzyzqwPltt2Xykf2nuB5HEB/JuKxWrhC/FVZMYl7ij3bxS9y8izOD63BM5Q2Mi1uOPBsYD/eITpe+dls6P02Wz+RuH7ijeAIx5YmO+CGuEA6PYCv5+2g1CIcdt7M4H0fFq99UVX3zqnytb2mp37B37wg4uJ7GVdXe3wWv7f6ptvan3XT5rvu159u3wZuNb73VSOO2tRNn/gtVqDd0MP/DXfmPT8E83sdianmHqEKCQc4pDLQPj3eBy8w60RxdtbCz+I225zfHLtjXEAvqX4tvZRUtbFnY2JK8c3GMZd08ekczLibitVmzSrJg4fNBanXA/KYq+OjmnLm7p0SU5sKCuED34RNit5Vy56/L/cUH8dom160IJjcwATygAZ9DIiR+TgMUbX0NQhGLJsM2D+u3VRiNkQzAt2VwVHqpUHVa1kuwMkRvERGTUtLsjQn5be7yyaWGxmc6St6302nvvXfoEOjV1DYvJiurqEg3KmYF93J6ob9fevS8rnccaZo3mne+sid69rxnjeaXx4eNkvVaUO9VtHE0EaWepQ/3dPUNP1816PSuZuGPEecKU7b4qicmTE/Lz0+bnjBRZ2hK3Pf2SUeNTZMYey0yyVhR8MXKyolLZnQmpN7oun3uukZKWCDVqOcE+veUpMVZ6A9HQy407xA1cJH2e/fs5WcnbQ0qmV5SXY2XoK2TPtB8d+Vgz924mBpjWE3ZwYq6SeZNz8VKPlQP/MC/K+WlyLAzaR/SoAp9SMEUQNyA+8FGDa0nju1d8opB9y9X1E/WM1vdb5z/uutG8qLLM5JCKlfeLqwwJUd+NjOfOH24JAwiJWtw1+qwjofyYva1H77uPnvFEQW9boVLV62tf2FK+cS6uWc0928W36H0Fu2P2lO5qenPNS9uNE6o++N8OR4xeFmEvjhrOjTsGdBJdcIq83Rl7faXn3qSfsiphJ31G62GMX2pfHJbG8OAxvPvCmOIlhjQVIzjYAGYEQ9PJf+biEB/8XHTxnH5k4vX2u7eGRIaGr9o3prwiBdLhMf7tVe/h23/CSaWU9gIbkvx8JD7hDOfdYP5bLHBm4UZy3N1E3cmHTgutZnivLKMpZ1L0m50OTY6ZUDOYK/xwCnLoxyLzWYTbttsfT6Cuu++pMuTxsPmQbw8zC6H/RiP58rRPraqIv9uGm8d7y809y1dt0W5wWZj832gj3tM4sOZ6ukloYwDG3JEn+SyVWuxOJP8x1u3rBMsLC48s0cZKdWnB+tr/+6ROISXitLCjKUZgUZLyoHjvYk2sOSkyi7veYu5W5TVmVHA3GW+MEJWcmdS+kP+87dR3/+I4ZAyWL5+ijIG95GHxqv+keHKBdtu3bKxb3ZxcXZWSYnm+ysHer79tqfVfs9at7p1dU0NXuokuzDPrkp2ifLWBL/ZM9BKxZAdg8Yr2nufhR1Ddw25FgZzWtIFsq7/q66dyv5bziZLfmllvEGS73TFG/3IH7UgLCVbZ3hlSfSqIIY3P0L0zcaczQgcJ/f7OYi3FWUY5E7qqkB5ApkfbXk6ef7ocPvSbPxi8erYlvmrV89fN2fqC+mTuzrLLy2peG7HrIyMWSVR02sLoq5p5s9vnDZtzpxJEzUKhS48J6Flz4yoRqMxOtoQ+DuFoIsoSd+3l/UPzOuxigi5HqQd1CSnt7QXtK1dZfMZvYw+DZcVm2qF4L5uTHI+4Z13XLPghqCWc05aSbSDwwak6uDdP3Jszk9Ly1U/2VDYeoKBIKgd9bml2SnXZubfOM+VSjgYEcurKIftqx4mXARNnIL20PJXaXkPBHJfMy5WUxFSjquJgrixXV90Y0NSBG830HuYeEK7aPWXMB7q++NhwzL6AKLivvwSrnJh1OB4n5t8klbB52egQM4VI53Hn0dZkt84adUgb71TAR+4f3TTmf4N5YGBf4gcuYgu64apgrp3IHvh2eDfG4XU/nI5ftVoz3qU4Sbtr7j1m0E08zn0cU7d38cRqhbUrY6EU4e5XacI2yulma204F45RtorU7gmiS7NCYk+1knfNyR9GV/5ED3fRU/l8130TyX6BCd9lUSX4iTRTU56JbOfPiPYB75TWtj/Eh73rm30wlbwEewQU05fZ+dT8PxH+Rz04E1PrwWfrYJ9BaQyAMBRjee/KvMxHsQNVHqVnp6ESSs7O1cq82l35unTmSzH+QYQpb4sVf8cO9/g+s+UB5lwnjsrn4naPEhAQgJtce6OimGD/TwQtKIC31AM62sV/tSfwP2qaDvUd1jA4Uf+CecgWZgAeJydVj1vHDcQnT3JysmyDRtJBARIAFaB5BzupBNkS1YluXZjBALchbfLu6W9t1wsuV5s7cZBfkGQHxC4TJEyXVK6ClKkTZcfEShvuLw7fZwcx1rc8nE4M29mOEuKiL6IRhRR+zekccARbdBPAXfoI3ob8Ap9TP8EvEob0XbAN+izSAe8BvkPAXfp0+j3gNfpZnQW8Abd73wT8C36vPNbwLejX9eygO/QV91vA75LG923YI9W1zFLfCSMI9qk7wPuwOKXgFfoS/oj4FXajO4FfIOG0X7Aa5C/CrhL96MfA16nT6K/A96grzs3A75FB53vAr698rrzV8B36LS7G/Bd2uz+zPjsjOPp/klvSKCuO7RLB0BPSFNMJRmy+I3JQfYYqKTCvyUkGiinPlaOKcMjINc0oRRr1s8URoXxJd4JNOmNGO7sHognOi6NNWMnHpuyMKV02uR9cZxlotST1FlRKqvKlyqBzQnIUhBZBJR6Cg6HTmSa2zgt9RiTpyCYUIUgJDToqZpUmSyvsxWX9c/5Ev9he5H31KdnQym4gH2U8CEdAe0CHWLk3x6eB7QPCZ2q0iJbMezvPDwa7u4cDg+He3sP9nfej/H9N4aWVpmwWdLbc7wniJ+3jo5liZhOVAbM++fg7hEN8NT+6dP0CnEfcwP5ALjx9BMfQAEPDaRjT8K9MIBT54pHg0Fd1/3pLK5+bKYD1xRmUsoibQZjkzs7uC4AC9fPfX5MpiDjfF9APgvkPImVzyVcq9qULywTLS+dRRMUeDKscY+KedTc18+AK4xT0DYYK9/PAqsp9O05bZYZvGPf9Rykoh7midcrfKM1XiKhzzyF3+DWNg5eVJhL77vwzcV1d36NrUY+DubnODKfkfIt08bVWrA1F+eyZDzPoTefz3wtq07h5wlsYsx7vl7t99zy9uY8lzPQvr1qXydu5uU1q0OmrB0jmwpc7UlxtfZsk3m0Bf1tjApro1CXZd7bGD60tgvvifc0mZ9ozu9cPP/QlmUwY78a19G5HuBM2lyc55t9wuy/zTWBpPaZG8ivy7TtPXmhq5TfFxPebVYtrvzHVXlLjna2mzM/qT8Uinf2aHvq52FnFt5nX4gOVeb+4XhHvtLhFlgcTLYqikyrRPCn3xfPTCWmshGVVcKl2nqxcEbEpZJO9USibZHJpidknoii1FiNoaIwSisKVU61c3A3amCvRKZjlbMvLFhhyhkYM0OPR9ZahFOUJqli1xN8+cC2xzYzAp2LOtVxei6yGqQ6j7MqwU01j97kWSO29LZQ0xFiWajDw7ui9eqJzid8+7lSx3xeLwjYfO7ryFdgS4PFqSkf7qUGa2LqPDMyuVg92ZZKlZyOARXelSsqJxLFabJOqrLiYkVxH+dNUOcNgUPUJ9Uj7fy9PDulbTinuVVjfxr//6tCokHaxvRnuMUhnpjYXn9VyBEy+KD/Df4FYU098QAAAHicbZpleFVHF4Vn7z24l5YqLTWkArlj5956rgRoobRIW0opDRAgFEgbApS6u7u7u7u7u7u7u/crN8OsNM+XH+yZnMtac54873vuj6NYVX/+OVMZ9X9+5MF//yHFSlRn1UV1U91VT9VL9VZ9VF+1rOqnVlKrqP5qNTVAra7WVAPVIDVYDVHDlFNBFVStKqmyqqg6NVyNUCPV5moLNUqNVmPUVmprNVaNU+PVBLWN2lZtpyaqSWoHNVlNUfXqU3WwOlodoS5Uh6vX1QHqBHUUsTpUva2+VbPVrmoX1az2ULeqfUlIUwfqSJ2oM3WhrtSNuqtX1XvUQ72h3lTvqtfUO9STelFv6kPLUF9alpajfrQ8rUAr0kq0Mq1C/WlVWo0G0Oq0Bq1Ja9HaNJAG0WAaQuvQurQerU9DaRjVUI4MWXLkKVBGeSrQBrQhbUQb0ya0KW1GtVSkEpWpQnU0nEbQSNqctqBRNJq2pDG0FW1NY2kcjacJtA1tS9vRRNqeJtEONJl2pCm0E9XTVJpG06mBZtBMmkWNNJt2pjk0l+ZRE+1Cu1IzzacWWkALaRHtRotpd9qD9qS9aG/ah/al/Wh/OoAOpIPoYHWL2l/drw5RD9MhdKg6kg6jw+kIOpKOoqPpGDqWjqPj6QQ6kU6ik+kUOpVOo9PpDDqTzqKz6Rw6l86j8+kCupAuoovpErqULqPL6Qq6kq6iq+kaupauo+vpBrqRbqKb6Ra6lW6j2+kOupPuorvpHrqX7qP76QF6kB6ih+kRepQeo8fpCXqSnqKn6Rl6lp6j5+kFepFeopfpFXqVXqPX6Q16k96it+kdepfeo/fpA/qQPqKP6RP6lD6jz+kL+pK+oq/pG/qWvqPv6Qf6kX6in+kX+pV+o9/pD/qT/qK/6R9WTMwsrLkDd+RO3Jm7cFfuxt25B/fkXtyb+/Ay3JeX5eW4Hy/PK/CKvBKvzKtwf16VV+MBvDqvwWvyWrw2D+RBPJiH8Dq8Lq/H6/NQHsY1nGPDlh17Dpxxngu8AW/IG/HGvAlvyptxLRe5xGWucB0P5xE8kjfnLXgUj+YteQxvxVvzWB7H43kCb8Pb8nY8kbfnSbwDT+YdeQrvxPU8lafxdG7gGTyTZ3Ejz+adeQ7P5XncxLvwrtzM87mFF/BCXsS78WLenffgPXkv3pv34X15P96fD+AD+SA+mA/hQ/kwPpyP4CP5KD6aj+Fj+Tg+nk/gE/kkPplP4VP5ND6dz+Az+Sw+m8/hc/k8Pp8v4Av5Ir6YL+FL+TK+nK/gK/kqvpqv4Wv5Or6eb+Ab+Sa+mW/hW/k2vp3v4Dv5Lr6b7+F7+T6+nx/gB/khfpgf4Uf5MX6cn+An+Sl+mp/hZ/k5fp5f4Bf5JX6ZX+FX+TV+nd/gN/ktfpvf4Xf5PX6fP+AP+SP+mD/hT/kz/py/4C/5K/6av+Fv+Tv+nn/gH/kn/pl/4V/5N/6d/+A/+S/+m/8RJSQsIlo6SEfpJJ2li3SVbtJdekhP6SW9pY8sI31lWVlO+snysoKsKCvJyrKK9JdVZTUZIKvLGrKmrCVry0AZJINliKwj68p6sr4MlWFSIzkxYsWJlyCZ5KUgG8iGspFsLJvIprKZ1EpRSlKWitTJcBkhI2Vz2UJGyWjZUsbIVrK1jJVxMl4myDayrWwnE2V7mSQ7yGTZUabITlIvU2WaTJcGmSEzZZY0ymzZWebIXJknTbKL7CrNMl9aZIEslEWymyyW3WUP2VP2kr1lH9lX9pP95QA5UA6Sg+UQOVQOk8PlCDlSjpKj5Rg5Vo6T4+UEOVFOkpPlFDlVTpPT5Qw5U86Ss+UcOVfOk/PlArlQLpKL5RK5VC6Ty+UKuVKukqvlGrlWrpPr5Qa5UW6Sm+UWuVVuk9vlDrlT7pK75R65V+6T++UBeVAekoflEXlUHpPH5Ql5Up6Sp+UZeVaek+flBXlRXpKX5RV5VV6T1+UNeVPekrflHXlX3pP35QP5UD6Sj+UT+VQ+k8/lC/lSvpKv5Rv5Vr6T7+UH+VF+kp/lF/lVfpPf5Q/5U/6Sv+UfrTRp1qK17qA76k66s+6iu+puurvuoXvqXrq37qOX0X31sno53U8vr1fQK+qV9Mp6Fd1fr6pX0wP06noNvaZeS6+tB+pBerAeotfR6+r19Pp6qB6ma3ROG221014Hnem8LugN9IZ6I72x3kRvqjfTtbqoS7qsK7pOD9cj9Ei9ud5Cj9Kj9ZZ6jN5Kb63H6nF6vJ6gt9Hb6u30RL29nqR30JP1jnqK3knX66l6mp6uG/QMPVPP0o16dqcF8xpraoq+48iWxjnTGzo2to4JrWNBdVQ/Y4Jtnfmls9g6C6Z1FuO+WGqdpUKXmc31CxumNc2d2qV+2oKW6qp6zdaYLtXkNr9xcYY4szjzPWY1Ne1cP7VpYdtP18ZZjLO10+aK3ac3tUxtmNO0CB82MdLESJNvnda3ThdnFo+Q+Q4tTfOa5veY3tjQ3DC/cX5113qtrjXLZbVxFuMsxVmOsxJnXevMmzhtnC5OH2fMzWdx5uMsVKfP1cZZjLMUZ7UvV6k1cdo4XZw+zhBnFmc+zkKctXEW4yzFuTS/Emdd6yzWxJmLM/YXY38x9hdjfzH2F2N/MfYVY18x9hVjXzH2FWNfKfaVYl8p9pViXyn2lWJfKfaVYl8p3m8p3m8p5pdifjnml2N+OeaXY3455pdjfjnml2N+OeaXY3453l853l853l853l859pdjfyX2V2J/JfZXYn8l9lViXyX2VWJfJfZVYl8l9lViXyX2VWJfXeyry3WcWKW04+LqiL+Nd1sX77YuttfF1rpqq6lp/euYXK563RgbOm9ZP7dhdMPQmqULs3Rhly7c0oVfukj/K1u6yC9dFLrERa4mrXJpZdLKppVLK59WWVrl0yolm5RsUp5JeSblmZRnQlqlPJPybMqz6aQ2JduUbFOyTck2Jdt0Zps6bOpwKdmlZJeSXUp2KdmlZJeSXUp2Kdmn0/vU4VOHTx0+dfjU4VOHTx0+dfjUEVJHSMkhJYeUHFJySMkhJYeUHFJylpKzdPosdWSpI0sdWerIUkeWOrLUkaWOfOrIp4586sinjnzqyKeOfOrIp458Si6k5EJKLqTkQsorpLxCyiukvEI6c6HQNdFTg2UOS4OlxdJh6bEMWGZY5rFEWw5tObTl0JZDWw5tObTlUJFDRQ4VBhUGFQYVBhUGFQYVBjdk0GbQZtBmUWFRYVFhUWFRYZFrkWuR63AXDhUOuQ5hDud1yHXI9QjzCPM4r0eux3k9wjxOFhAWEBaQEJAQcMiAQwbkZgjLEJbhZBnCMiRkbRJwmxkOmUduHrl55OZx3jwOmUdFHhV55BaQW0BuAbkFhBUQVkBYAecFhQboGfBmwJsBbwa8GfBmwJsBbwa8GfBmwJsBZAZkGZBlQJYBTgY4GeBkgJMBTgY4GTBkwJCxOCQYMmDIAJx/v0hgifOCIQOGDBgyYMg4VDicF+AYgGMcwgCOATgG4BiAYzzO63Fe4GQ8KkCWAVkGZJmANkBmAJkBZAaQGUBmAtoC2oCeAXoG6JkMbaDQZGgDkAZAGgBpAKQBkAZAGgBpAKTJow1sGrBpwKbJow2YGmBqgKkBpqaAtgLaAK8BvAbwGsBrAK/FI9SCY4tHqAXSFkhbIG2BtAXSFkhbIG2BtAXSFkhbPEIt6LZ4hNoc2sC8BfMWzFs8TS3wt8DfAn8L/C3wt8Df4mlqYQILE1iYwOLBaiEFCylYPFgt/GDhBws/WPjBwg8WfrDwg4UfLB63FqqwePJaPHktBGIhEAuBWDyELVxi4RILl1i4xMIlFi6xcImFSyxcYuESC5dYuMTCJRYusXCJhUssXGLhEguXWLjEwiUWLrFwiYVLLFxi4RILl1i4xMIlFi6xcImFSyxcYuESC5dYuMTCJRYusXCJhUssXGLhEguXWLjEwiUWLrFwiYVLLFzi4BIHlzi4xMElDi5xcImDSxxc4uASB5c4uMTBJQ4ucXCJg0scXOLgEgeXOLjEwSUOLnFwiYNLHFzi4BIHlzi4xMElDi5xcImDSxxc4uASB5c4uMTBJQ4ucXCJg0scXOLgEgeXOLjEwSUOLnFwiYNLHFzi4BIHlzi4xMElDi5xcImDSxxc4uASB5c4uMTBJQ4ucXCJg0scXOLgEgeXOLjEwSUOLnFwiYNLHFzi4BIHlzi4xMElDi5xcImDSxxc4uASB5c4uMTBJQ4ucXCJg0scXOLgEgeXOLjEwSUOLnFwiYNLHFzi4BIHlzi4xMElHi7xcImHSzxc4uESD5d4uMTDJR4u8XCJh0s8XOLhEg+XeLjEwyUeLvFwiYdLPFzi4RIPl3i4xMMlHi7xcImHSzxc4uESD5d4uMTDJR4u8XCJh0s8XOLhEg+XeLjEwyUeLvFwiYdLPFzi4RIPl3i4xMMlHi7xcImHSzxc4uESD5d4uMTDJR4u8XCJh0s8XOLhEg+XeLjEwyUeLvFwiYdLPFzi4RIPl3i4xMMlHi7xcImHSzxc4uESD5d4uMTDJR4u8XCJh0s8XOLhEg+XeLjEwyUeLvFwiYdLPFzi4RIPl3i4xMMlHi7xcImHSzxcEuCSAJcEuCTAJQEuCXBJgEsCXBLgkgCXBLgkwCUBLglwSYBLAlwS4JIAlwS4JMAlAS4JcEmASwJcEuCSAJcEuCTAJQEuCXBJgDUCVBGgigBVBPghQAoBUgiQQoAUAqQQIIUAKQRIIbg2FTgkpBDAfADzAcwHMB8AegDoAaAHgB4AegDoAaAHgB4AegDoAaAHIB2AdADSARwHcBzAcQDHARwHcBzAcQDHARwHwBsAbwC8AfAGwBsAbwC8AfAGwBsAbwC8AfAGwBsAbwZ4M8CbAd4M8GaANwO8GeDNAG8GeDPAmwHeDPBmgDcDvBngzQBvBngzwJsB3gzwZoA3A7wZ4M0AbwZ4M8CbAd4M8GaANwO8Gb4IZPgikAHpDF8EMuu6xVcQhtbPaekeX1oYOq1+fkPcZNVNz/QyROs2vRHR9qPFthvTdlNquwltN7Wteel9irbXXHWzzH/eoGhzPde2z2RtN23vwPrqpmv1PYjqstvU5obWtGmLe7dZt16c3jB/WsO86Q3N/15ss65e7FV9rSHnhs5pmjanOHxs3Bf/uzftrlvTbm/b7dt/PrTbZ+32+Xb7wn/3vtzuem27fbvz2rr/7l2787p253Ht+l27fldqt2/X7yrt+nPV/bixxU67NzQ3DW2Z0bFpXsOS0bJoya5zy6zmhiX7TjOaFjRXZ+PC6vX5jbstuT7/3z/hvCWLhsaZs1qWfGBeYzXgf/Zq69UAAAAB//8AAnicY2BkYGDgAWI9IGZiYGVgZLgPxA+AkInhIbM1AyOzDbMdAxOzPfNhoDgLWBUDAJAtBZd4nM1U7U+NYRj/3ffvHCkhqbzb+WTW2IwQi02OYjoraTTMdpyQnF5UGl9svjDMS/JWUZ1SIUmSl5KkmZkZZoZv/gafbbme+3lQdj6cD32wZ/f1u5/rvq7rvt7uCwpADPpUMujNyMpDQuBoeRDJQX9lCc7BJacYGcEEAQUtGIWJSALTM3M9WOjb7PUgbWtuugc5YeQsTpTDYRieKwzP7fDioH3ZWR7E5Wb7hIaxHu33ByuRGvBX7MXaQKC4DN5gaSCILENzDc0vLS8owe6yksPFKKi0aJGxAUPlZrGmTJQKkwyNMTTaUNunWEMnYwrmYwFSkAYvspCHXdiHElThGE5IppSROmJ8dKkMVaiuqx82V5928IMdAZPsf9Y5+N3wtWuBy2tzXPkONjjY7GCbgz9tdMeL/0Es4xCHWc2LvMRrrOUVXuB51vEqa3iZ9bzOG2xgI2+ylW18ynbe4m3eYQfvspP32MX77OYD9vAhe/mIj/mEg3zBlwyxReK3Yp8qNVBYZtCPPQigAHslA/tRiAOS1YPiRzHKcAjlqFLD6r36plP1Kr1ar9HrdLper716g87Um7RP5+htervO1zv0Tr2PKVzOFWxiM/vYzwErFukWK5vxsmaaSK0qKSw06Jeb4EgkCGc2ko0MHRkl2SyWyti+VIzRUVI/yy4cq1a/+UUaIl0ucVbJFye+NGGa+NOM+Agk/rXKCHQUVsormiHRzRL/52Au5iEbW3ASp3AGZ3Ee1ajBZVxFLepxA40IoQWtaMdtdKATXehGD3rxGE/RjwEMYgjDeIXXeIO3eIf3+IhP+Iwv+GpXXXxahOkR9IhV8UiyMr7W4rAUG2VpkSqKSINyX6O8nRBDQlvkHvVHTxk9ZfSU0VNGz54dCaZO9gfR+L2z1oT/Ok80Ha/kNcKJwWO6O9aaj2FOF486HV9P5I2p49YdOnXMXmMJEp05E8GUEa1EZ1ZEMClMn7jHzCP3qJlhTYKYv/98xuf2FDPv3GSBS7kC7l8d5zDbeJxjYGRgYOBisGGwY2B2cfMJYRBJrizKYZDLSSzJY9BgYAHKMvz/DySwsYAAAF4EC3wAAAAAAAEAAAAA22P9NgAAAADWfsaQAAAAAONsm0c=')format("woff");}.ff2{font-family:ff2;line-height:1.039551;font-style:normal;font-weight:normal;visibility:visible;}
.m0{transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);-ms-transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);-webkit-transform:matrix(0.250000,0.000000,0.000000,0.250000,0,0);}
.v0{vertical-align:0.000000px;}
.ls0{letter-spacing:0.000000px;}
.sc_{text-shadow:none;}
.sc0{text-shadow:-0.015em 0 transparent,0 0.015em transparent,0.015em 0 transparent,0 -0.015em  transparent;}
@media screen and (-webkit-min-device-pixel-ratio:0){
.sc_{-webkit-text-stroke:0px transparent;}
.sc0{-webkit-text-stroke:0.015em transparent;text-shadow:none;}
}
.ws0{word-spacing:-12.912000px;}
.ws1{word-spacing:0.000000px;}
._4{margin-left:-3.360000px;}
._2{margin-left:-1.305600px;}
._3{width:45.792000px;}
._1{width:196.819994px;}
._0{width:410.547507px;}
._5{width:649.532800px;}
.fc0{color:rgb(35,31,32);}
.fs3{font-size:40.000000px;}
.fs1{font-size:48.000000px;}
.fs2{font-size:48.460800px;}
.fs0{font-size:72.000000px;}
.y0{bottom:-0.500000px;}
.y1f{bottom:79.192300px;}
.y1e{bottom:93.592300px;}
.y1d{bottom:107.992300px;}
.y1c{bottom:122.392300px;}
.y1b{bottom:136.792300px;}
.y1a{bottom:151.192300px;}
.y19{bottom:165.592300px;}
.y18{bottom:179.992300px;}
.y17{bottom:194.392300px;}
.y16{bottom:208.792300px;}
.y27{bottom:235.182300px;}
.y15{bottom:236.046100px;}
.y26{bottom:247.182300px;}
.y14{bottom:250.446100px;}
.y25{bottom:259.182300px;}
.y13{bottom:264.846100px;}
.y24{bottom:273.582300px;}
.y12{bottom:279.246100px;}
.y23{bottom:287.982300px;}
.y11{bottom:293.646100px;}
.y22{bottom:302.382300px;}
.y10{bottom:308.046100px;}
.yf{bottom:322.446100px;}
.y21{bottom:329.821700px;}
.ye{bottom:336.846100px;}
.y1{bottom:351.884700px;}
.y3e{bottom:386.016400px;}
.y3d{bottom:400.416400px;}
.y3c{bottom:414.816400px;}
.y5{bottom:420.961700px;}
.y3b{bottom:429.216400px;}
.y30{bottom:459.126100px;}
.y4{bottom:463.743200px;}
.y2f{bottom:473.526100px;}
.y2e{bottom:487.926100px;}
.y2d{bottom:502.326100px;}
.y3{bottom:506.524700px;}
.y2c{bottom:516.726100px;}
.y2b{bottom:531.126100px;}
.y2{bottom:544.252000px;}
.y2a{bottom:545.526100px;}
.y29{bottom:559.926100px;}
.y28{bottom:574.326100px;}
.ya{bottom:603.280500px;}
.y3a{bottom:615.219500px;}
.y9{bottom:621.622100px;}
.y39{bottom:629.619400px;}
.y8{bottom:640.425500px;}
.y38{bottom:644.019500px;}
.y37{bottom:658.419400px;}
.y36{bottom:672.819500px;}
.yb{bottom:673.914200px;}
.y7{bottom:674.463500px;}
.y35{bottom:687.219500px;}
.y34{bottom:701.619400px;}
.y6{bottom:705.811000px;}
.y33{bottom:716.019500px;}
.y32{bottom:730.419400px;}
.y31{bottom:744.819500px;}
.yd{bottom:746.472900px;}
.y20{bottom:767.160200px;}
.yc{bottom:785.076800px;}
.h6{height:33.125000px;}
.h5{height:39.750000px;}
.h3{height:43.523438px;}
.h4{height:43.941263px;}
.h2{height:65.285156px;}
.h0{height:841.890000px;}
.h1{height:842.500000px;}
.w0{width:595.276000px;}
.w1{width:596.000000px;}
.x0{left:0.000000px;}
.xd{left:40.161400px;}
.x1{left:46.771600px;}
.xb{left:61.653500px;}
.xe{left:76.535400px;}
.xc{left:79.653500px;}
.xf{left:94.535400px;}
.x3{left:124.775600px;}
.x2{left:126.480300px;}
.x6{left:229.688700px;}
.xa{left:234.421200px;}
.x7{left:261.213100px;}
.x5{left:370.234200px;}
.x4{left:371.939000px;}
.x8{left:397.808500px;}
.x9{left:437.523300px;}
@media print{
.v0{vertical-align:0.000000pt;}
.ls0{letter-spacing:0.000000pt;}
.ws0{word-spacing:-17.216000pt;}
.ws1{word-spacing:0.000000pt;}
._4{margin-left:-4.480000pt;}
._2{margin-left:-1.740800pt;}
._3{width:61.056000pt;}
._1{width:262.426658pt;}
._0{width:547.396676pt;}
._5{width:866.043733pt;}
.fs3{font-size:53.333333pt;}
.fs1{font-size:64.000000pt;}
.fs2{font-size:64.614400pt;}
.fs0{font-size:96.000000pt;}
.y0{bottom:-0.666667pt;}
.y1f{bottom:105.589733pt;}
.y1e{bottom:124.789733pt;}
.y1d{bottom:143.989733pt;}
.y1c{bottom:163.189733pt;}
.y1b{bottom:182.389733pt;}
.y1a{bottom:201.589733pt;}
.y19{bottom:220.789733pt;}
.y18{bottom:239.989733pt;}
.y17{bottom:259.189733pt;}
.y16{bottom:278.389733pt;}
.y27{bottom:313.576400pt;}
.y15{bottom:314.728133pt;}
.y26{bottom:329.576400pt;}
.y14{bottom:333.928133pt;}
.y25{bottom:345.576400pt;}
.y13{bottom:353.128133pt;}
.y24{bottom:364.776400pt;}
.y12{bottom:372.328133pt;}
.y23{bottom:383.976400pt;}
.y11{bottom:391.528133pt;}
.y22{bottom:403.176400pt;}
.y10{bottom:410.728133pt;}
.yf{bottom:429.928133pt;}
.y21{bottom:439.762267pt;}
.ye{bottom:449.128133pt;}
.y1{bottom:469.179600pt;}
.y3e{bottom:514.688533pt;}
.y3d{bottom:533.888533pt;}
.y3c{bottom:553.088533pt;}
.y5{bottom:561.282267pt;}
.y3b{bottom:572.288533pt;}
.y30{bottom:612.168133pt;}
.y4{bottom:618.324267pt;}
.y2f{bottom:631.368133pt;}
.y2e{bottom:650.568133pt;}
.y2d{bottom:669.768133pt;}
.y3{bottom:675.366267pt;}
.y2c{bottom:688.968133pt;}
.y2b{bottom:708.168133pt;}
.y2{bottom:725.669333pt;}
.y2a{bottom:727.368133pt;}
.y29{bottom:746.568133pt;}
.y28{bottom:765.768133pt;}
.ya{bottom:804.374000pt;}
.y3a{bottom:820.292667pt;}
.y9{bottom:828.829467pt;}
.y39{bottom:839.492533pt;}
.y8{bottom:853.900667pt;}
.y38{bottom:858.692667pt;}
.y37{bottom:877.892533pt;}
.y36{bottom:897.092667pt;}
.yb{bottom:898.552267pt;}
.y7{bottom:899.284667pt;}
.y35{bottom:916.292667pt;}
.y34{bottom:935.492533pt;}
.y6{bottom:941.081333pt;}
.y33{bottom:954.692667pt;}
.y32{bottom:973.892533pt;}
.y31{bottom:993.092667pt;}
.yd{bottom:995.297200pt;}
.y20{bottom:1022.880267pt;}
.yc{bottom:1046.769067pt;}
.h6{height:44.166667pt;}
.h5{height:53.000000pt;}
.h3{height:58.031250pt;}
.h4{height:58.588350pt;}
.h2{height:87.046875pt;}
.h0{height:1122.520000pt;}
.h1{height:1123.333333pt;}
.w0{width:793.701333pt;}
.w1{width:794.666667pt;}
.x0{left:0.000000pt;}
.xd{left:53.548533pt;}
.x1{left:62.362133pt;}
.xb{left:82.204667pt;}
.xe{left:102.047200pt;}
.xc{left:106.204667pt;}
.xf{left:126.047200pt;}
.x3{left:166.367467pt;}
.x2{left:168.640400pt;}
.x6{left:306.251600pt;}
.xa{left:312.561600pt;}
.x7{left:348.284133pt;}
.x5{left:493.645600pt;}
.x4{left:495.918667pt;}
.x8{left:530.411333pt;}
.x9{left:583.364400pt;}
}
</style>
