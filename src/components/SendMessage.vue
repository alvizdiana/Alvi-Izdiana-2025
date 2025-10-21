<script setup lang="ts">
defineProps({
  tab: String,
})
import { ref, computed } from 'vue'

interface ContactForm {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}

const form = ref<ContactForm>({
  name: '',
  email: '',
  projectType: 'Web Development',
  budget: '',
  message: '',
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error' | 'invalid'>('idle')

// formspree
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/movkznzr'

const projectTypes = [
  'Web Development',
  'Data Analysis/Visualization',
  'UI/UX Design',
  'Other (Write in Message)',
]

const isFormValid = computed(() => {
  return (
    form.value.name.trim() !== '' &&
    form.value.email.trim() !== '' &&
    form.value.message.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email.trim())
  )
})

const handleSubmit = async () => {
  submitStatus.value = 'idle'

  if (!isFormValid.value) {
    submitStatus.value = 'invalid'
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 4000)
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(form.value),
    })

    if (response.ok) {
      submitStatus.value = 'success'
      form.value.name = ''
      form.value.email = ''
      form.value.projectType = projectTypes[0]
      form.value.budget = ''
      form.value.message = ''
    } else {
      submitStatus.value = 'error'
    }
  } catch (error) {
    console.error('Submit failed:', error)
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  }
}
</script>
<template>
  <div class="contact-container p-10">
    <div
      class="flex rounded-full justify-center text-white h-10 pl-7 pr-7 bg-[#612a55] items-center text-lg font-semibold mb-10 shadow-lg"
    >
      Let's Connect!
    </div>

    <!-- notif sukses/gagal/invalid -->
    <Transition name="fade">
      <div
        v-if="submitStatus !== 'idle'"
        :class="[
          'p-4 rounded-lg mb-6 font-medium transition-all duration-300',
          submitStatus === 'success'
            ? 'bg-green-100 text-green-800'
            : submitStatus === 'error'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800',
        ]"
        role="alert"
      >
        <p v-if="submitStatus === 'success'">
          ✅ Proposal sent! I will review the details of your project and contact you shortly.
        </p>
        <p v-else-if="submitStatus === 'error'">
          ❌ Sorry, it seems there was an error during the proposal submission process. Please check
          your internet connection or try sending the proposal again after a while.
        </p>
        <p v-else-if="submitStatus === 'invalid'">
          ⚠️ Please fill in all required fields with the correct format!
        </p>
      </div>
    </Transition>

    <div class="flex flex-col md:flex-row-reverse md:justify-around">
      <div class="md:w-7/10">
        <form
          class="space-y-6 p-5 md:p-10 bg-[#612a55] shadow-2xl rounded-xl"
          @submit.prevent="handleSubmit"
        >
          <h1 class="text-2xl font-bold text-white">Let's Colaborate!</h1>
          <div class="sm:col-span-4">
            <label for="name" class="block text-sm font-semibold text-white"
              >Your Name (or Company Name)</label
            >
            <div class="mt-2">
              <input
                id="name"
                type="text"
                v-model="form.name"
                name="name"
                autocomplete="given-name"
                required
                class="block w-full rounded-md border-0 bg-[#fbb359] px-3 py-2 text-base text-gray-900 shadow-sm ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-[#744A82] sm:text-sm"
                placeholder="Who can I contact?"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-semibold text-white">Email address</label>
            <div class="mt-2">
              <input
                id="email"
                type="email"
                v-model="form.email"
                name="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 bg-[#fbb359] px-3 py-2 text-base text-gray-900 shadow-sm ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-[#744A82] sm:text-sm"
                placeholder="Email address for the project"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="projectType" class="block text-sm font-semibold text-white"
              >Type of Project</label
            >
            <div class="mt-2">
              <select
                id="projectType"
                v-model="form.projectType"
                name="projectType"
                required
                class="block w-full rounded-md border-0 bg-[#fbb359] px-3 py-2 text-base text-gray-900 shadow-sm ring-inset focus:ring-2 focus:rin6-inset focus:ring-[#744A82] sm:text-sm"
              >
                <option v-for="type in projectTypes" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="budget" class="block text-sm font-semibold text-white"
              >Estimated Budget</label
            >
            <div class="mt-2">
              <input
                id="budget"
                type="text"
                v-model="form.budget"
                name="budget"
                class="block w-full rounded-md border-0 bg-[#fbb359] px-3 py-2 text-base text-gray-900 shadow-sm ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-[#744A82] sm:text-sm"
                placeholder="Discussable"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="message" class="block text-sm font-semibold text-white"
              >Project Details (Message)</label
            >
            <div class="mt-2">
              <textarea
                id="message"
                name="message"
                v-model="form.message"
                rows="5"
                required
                class="block w-full rounded-md border-0 bg-[#fbb359] px-3 py-2 text-base text-gray-900 shadow-sm ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-[#744A82] sm:text-sm"
                placeholder="Write down here about your project..."
              ></textarea>
            </div>
          </div>

          <div class="sm:col-span-4 pt-4 flex items-center justify-center md:justify-end">
            <button
              type="submit"
              :disabled="isSubmitting"
              :class="{
                'rounded-full px-7 py-3 text-center transition duration-300 font-bold shadow-md': true,
                'bg-[#351a40] text-[#fefedf] hover:bg-[#a74760]': !isSubmitting,
                'bg-gray-400 text-[#fefedf] cursor-not-allowed': isSubmitting,
              }"
            >
              <span v-if="isSubmitting">
                <svg
                  class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Mengirim Proposal...
              </span>
              <span v-else>Send</span>
            </button>
          </div>
        </form>
      </div>
      <div class="mt-10 md:mt-0 md:w-3/10 md:ml-3">
        <h1 class="text-2xl text-white font-bold">Contact Info</h1>
        <div class="col-lg-4 col-md-4 mb-lg-0 mt-5">
          <div class="flex mb-10 items-center">
            <div
              class="p-2"
              style="
                background: #a74760;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                border-radius: 50%;
                overflow: hidden;
                border: 1px solid#a74760;
                backdrop-filter: blur(9px);
                -webkit-backdrop-filter: blur(9px);
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path
                  fill="#FFFFFF"
                  d="M112 128C85.5 128 64 149.5 64 176C64 191.1 71.1 205.3 83.2 214.4L291.2 370.4C308.3 383.2 331.7 383.2 348.8 370.4L556.8 214.4C568.9 205.3 576 191.1 576 176C576 149.5 554.5 128 528 128L112 128zM64 260L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 260L377.6 408.8C343.5 434.4 296.5 434.4 262.4 408.8L64 260z"
                />
              </svg>
            </div>
            <div class="ml-5 text-white">
              <h4>Email</h4>
              <p>
                <a
                  href="mailto:alfiizdiana@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline underline-offset-4"
                  >alfiizdiana@gmail.com</a
                >
              </p>
            </div>
          </div>
          <div class="flex mb-10 items-center">
            <div
              class="p-2"
              style="
                background: #a74760;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                border-radius: 50%;
                overflow: hidden;
                border: 1px solid#a74760;
                backdrop-filter: blur(9px);
                -webkit-backdrop-filter: blur(9px);
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path
                  fill="#FFFFFF"
                  d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"
                />
              </svg>
            </div>
            <div class="ml-5 text-white">
              <h4>Phone</h4>
              <p>
                <a
                  href="https://wa.me/088806848668"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline underline-offset-4"
                  >+6288806848668</a
                >
              </p>
            </div>
          </div>
          <div class="flex mb-10 items-center">
            <div
              class="p-2"
              style="
                background: #a74760;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                border-radius: 50%;
                overflow: hidden;
                border: 1px solid#a74760;
                backdrop-filter: blur(9px);
                -webkit-backdrop-filter: blur(9px);
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path
                  fill="#FFFFFF"
                  d="M512 96L127.9 96C110.3 96 96 110.5 96 128.3L96 511.7C96 529.5 110.3 544 127.9 544L512 544C529.6 544 544 529.5 544 511.7L544 128.3C544 110.5 529.6 96 512 96zM231.4 480L165 480L165 266.2L231.5 266.2L231.5 480L231.4 480zM198.2 160C219.5 160 236.7 177.2 236.7 198.5C236.7 219.8 219.5 237 198.2 237C176.9 237 159.7 219.8 159.7 198.5C159.7 177.2 176.9 160 198.2 160zM480.3 480L413.9 480L413.9 376C413.9 351.2 413.4 319.3 379.4 319.3C344.8 319.3 339.5 346.3 339.5 374.2L339.5 480L273.1 480L273.1 266.2L336.8 266.2L336.8 295.4L337.7 295.4C346.6 278.6 368.3 260.9 400.6 260.9C467.8 260.9 480.3 305.2 480.3 362.8L480.3 480z"
                />
              </svg>
            </div>
            <div class="ml-5 text-white">
              <h4>LinkedIn</h4>
              <p>
                <a
                  href="https://www.linkedin.com/in/alvi-izdiana"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline underline-offset-4"
                  >alvi-izdiana</a
                >
              </p>
            </div>
          </div>
          <div class="flex mb-10 items-center">
            <div
              class="p-2"
              style="
                background: #a74760;
                width: 40px;
                height: 40px;
                display: flex;
                justify-content: center;
                border-radius: 50%;
                overflow: hidden;
                border: 1px solid#a74760;
                backdrop-filter: blur(9px);
                -webkit-backdrop-filter: blur(9px);
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                <path
                  fill="#FFFFFF"
                  d="M237.9 461.4C237.9 463.4 235.6 465 232.7 465C229.4 465.3 227.1 463.7 227.1 461.4C227.1 459.4 229.4 457.8 232.3 457.8C235.3 457.5 237.9 459.1 237.9 461.4zM206.8 456.9C206.1 458.9 208.1 461.2 211.1 461.8C213.7 462.8 216.7 461.8 217.3 459.8C217.9 457.8 216 455.5 213 454.6C210.4 453.9 207.5 454.9 206.8 456.9zM251 455.2C248.1 455.9 246.1 457.8 246.4 460.1C246.7 462.1 249.3 463.4 252.3 462.7C255.2 462 257.2 460.1 256.9 458.1C256.6 456.2 253.9 454.9 251 455.2zM316.8 72C178.1 72 72 177.3 72 316C72 426.9 141.8 521.8 241.5 555.2C254.3 557.5 258.8 549.6 258.8 543.1C258.8 536.9 258.5 502.7 258.5 481.7C258.5 481.7 188.5 496.7 173.8 451.9C173.8 451.9 162.4 422.8 146 415.3C146 415.3 123.1 399.6 147.6 399.9C147.6 399.9 172.5 401.9 186.2 425.7C208.1 464.3 244.8 453.2 259.1 446.6C261.4 430.6 267.9 419.5 275.1 412.9C219.2 406.7 162.8 398.6 162.8 302.4C162.8 274.9 170.4 261.1 186.4 243.5C183.8 237 175.3 210.2 189 175.6C209.9 169.1 258 202.6 258 202.6C278 197 299.5 194.1 320.8 194.1C342.1 194.1 363.6 197 383.6 202.6C383.6 202.6 431.7 169 452.6 175.6C466.3 210.3 457.8 237 455.2 243.5C471.2 261.2 481 275 481 302.4C481 398.9 422.1 406.6 366.2 412.9C375.4 420.8 383.2 435.8 383.2 459.3C383.2 493 382.9 534.7 382.9 542.9C382.9 549.4 387.5 557.3 400.2 555C500.2 521.8 568 426.9 568 316C568 177.3 455.5 72 316.8 72zM169.2 416.9C167.9 417.9 168.2 420.2 169.9 422.1C171.5 423.7 173.8 424.4 175.1 423.1C176.4 422.1 176.1 419.8 174.4 417.9C172.8 416.3 170.5 415.6 169.2 416.9zM158.4 408.8C157.7 410.1 158.7 411.7 160.7 412.7C162.3 413.7 164.3 413.4 165 412C165.7 410.7 164.7 409.1 162.7 408.1C160.7 407.5 159.1 407.8 158.4 408.8zM190.8 444.4C189.2 445.7 189.8 448.7 192.1 450.6C194.4 452.9 197.3 453.2 198.6 451.6C199.9 450.3 199.3 447.3 197.3 445.4C195.1 443.1 192.1 442.8 190.8 444.4zM179.4 429.7C177.8 430.7 177.8 433.3 179.4 435.6C181 437.9 183.7 438.9 185 437.9C186.6 436.6 186.6 434 185 431.7C183.6 429.4 181 428.4 179.4 429.7z"
                />
              </svg>
            </div>
            <div class="ml-5 text-white">
              <h4>Github</h4>
              <p>
                <a
                  href="https://github.com/alvizdiana"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline underline-offset-4"
                  >alvizdiana</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
