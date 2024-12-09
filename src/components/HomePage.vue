<template>
  <div class="container text-center mt-5">
    <h1>Welcome to the Survey Application</h1>
    <button class="btn btn-primary mx-2" @click="navigateToSurveyForm">Fill Out Survey</button>
    <button class="btn btn-secondary mx-2" @click="navigateToSurveyList">List of Surveys</button>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  methods: {
    navigateToSurveyForm() {
      this.$router.push('/survey-form');
    },
    navigateToSurveyList() {
      this.$router.push('/survey-list');
    },
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
