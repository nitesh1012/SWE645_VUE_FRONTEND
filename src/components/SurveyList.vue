<template>
    <div class="container mt-5">
      <h2>List of Surveys</h2>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>State</th>
            <th>Survey Date</th>
            <th>Liked Most</th>
            <th>Interest Source</th>
            <th>Likelihood to Recommend</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="survey in surveys" :key="survey.id">
            <td>{{ survey.firstName }}</td>
            <td>{{ survey.lastName }}</td>
            <td>{{ survey.email }}</td>
            <td>{{ survey.phone }}</td>
            <td>{{ survey.city }}</td>
            <td>{{ survey.state }}</td>
            <td>{{ survey.surveyDate }}</td>
            <td>
              <!-- Ensure likedMost is handled correctly -->
              {{ Array.isArray(survey.likedMost) ? survey.likedMost.join(", ") : survey.likedMost }}
            </td>
            <td>{{ survey.interestSource }}</td>
            <td>{{ survey.recommendation_list }}</td>
            <td>
              <button class="btn btn-warning btn-sm" @click="editSurvey(survey)">Edit</button>
              <button class="btn btn-danger btn-sm" @click="deleteSurvey(survey.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-primary" @click="fillOutSurvey">Fill Out Survey</button>
      <button class="btn btn-secondary" @click="cancel">Cancel</button>
    </div>
  </template>
  
  <script>
  import axios from "../axios";
  
  export default {
    data() {
      return {
        surveys: [],
      };
    },
    methods: {
      async fetchSurveys() {
        try {
          const response = await axios.get("/surveys");
          // Ensure likedMost is converted to arrays if needed
          this.surveys = response.data.map((survey) => ({
            ...survey,
            likedMost: typeof survey.likedMost === "string" ? survey.likedMost.split(",") : survey.likedMost,
          }));
        } catch (error) {
          console.error(error);
        }
      },
      async deleteSurvey(id) {
        try {
          await axios.delete(`/surveys/${id}`);
          this.fetchSurveys();
          alert("Survey deleted successfully!");
        } catch (error) {
          console.error(error);
          alert("Failed to delete the survey.");
        }
      },
      editSurvey(survey) {
        this.$router.push({ path: "/survey-form", query: { survey: JSON.stringify(survey) } });
      },
      fillOutSurvey() {
        this.$router.push("/survey-form");
      },
      cancel() {
        this.$router.push("/");
      },
    },
    created() {
      this.fetchSurveys();
    },
  };
  </script>
  