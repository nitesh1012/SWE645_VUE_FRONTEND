<template>
    <div class="container mt-5">
      <h2>{{ isEditMode ? "Edit Survey" : "Fill Out Survey" }}</h2>
      <form @submit.prevent="submitSurvey">
        <div class="mb-3">
          <label for="firstName" class="form-label">
            First Name <span class="text-danger">(*)</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="survey.firstName"
            required
          />
        </div>
        <div class="mb-3">
          <label for="lastName" class="form-label">
            Last Name <span class="text-danger">(*)</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="survey.lastName"
            required
          />
        </div>
        <div class="mb-3">
          <label for="streetAddress" class="form-label">
            Street Address <span class="text-danger">(*)</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="streetAddress"
            v-model="survey.streetAddress"
            required
          />
        </div>
        <div class="mb-3">
          <label for="city" class="form-label">
            City <span class="text-danger">(*)</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="city"
            v-model="survey.city"
            required
          />
        </div>
        <div class="mb-3">
          <label for="state" class="form-label">
            State <span class="text-danger">(*)</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="state"
            v-model="survey.state"
            required
          />
        </div>
        <div class="mb-3">
          <label for="zip" class="form-label">
            Zip <span class="text-danger">(*)</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="zip"
            v-model="survey.zip"
            required
          />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">
            Phone <span class="text-danger">(*)</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="phone"
            v-model="survey.phone"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">
            Email <span class="text-danger">(*)</span>
          </label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="survey.email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="surveyDate" class="form-label">
            Survey Date <span class="text-danger">(*)</span>
          </label>
          <input
            type="date"
            class="form-control"
            id="surveyDate"
            v-model="survey.surveyDate"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">What did you like the most?</label>
          <div>
            <input
              type="checkbox"
              id="students"
              value="students"
              v-model="survey.likedMost"
            />
            <label for="students">Students</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="location"
              value="location"
              v-model="survey.likedMost"
            />
            <label for="location">Location</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="campus"
              value="campus"
              v-model="survey.likedMost"
            />
            <label for="campus">Campus</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="atmosphere"
              value="atmosphere"
              v-model="survey.likedMost"
            />
            <label for="atmosphere">Atmosphere</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="dormRooms"
              value="dormRooms"
              v-model="survey.likedMost"
            />
            <label for="dormRooms">Dorm Rooms</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="sports"
              value="sports"
              v-model="survey.likedMost"
            />
            <label for="sports">Sports</label>
          </div>
        </div>
        <div class="mb-3">
          <label class="form-label">
            How did you become interested in the university?
          </label>
          <div>
            <input
              type="radio"
              id="friends"
              value="friends"
              v-model="survey.interestSource"
            />
            <label for="friends">Friends</label>
          </div>
          <div>
            <input
              type="radio"
              id="television"
              value="television"
              v-model="survey.interestSource"
            />
            <label for="television">Television</label>
          </div>
          <div>
            <input
              type="radio"
              id="internet"
              value="internet"
              v-model="survey.interestSource"
            />
            <label for="internet">Internet</label>
          </div>
          <div>
            <input
              type="radio"
              id="other"
              value="other"
              v-model="survey.interestSource"
            />
            <label for="other">Other</label>
          </div>
        </div>
        <div class="mb-3">
          <label for="recommendation_list" class="form-label">
            Likelihood of recommending the school to others
          </label>
          <select
            id="recommendation_list"
            class="form-select"
            v-model="survey.recommendation_list"
          >
            <option value="Very Likely">Very Likely</option>
            <option value="Likely">Likely</option>
            <option value="Unlikely">Unlikely</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? "Update" : "Submit" }}
        </button>
        <button type="button" class="btn btn-secondary" @click="cancel">
          Cancel
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "../axios";
  
  export default {
    data() {
      return {
        survey: {
          firstName: "",
          lastName: "",
          streetAddress: "",
          city: "",
          state: "",
          zip: "",
          phone: "",
          email: "",
          surveyDate: "",
          likedMost: [],
          interestSource: "",
          recommendation_list: "",
        },
        isEditMode: false,
      };
    },
    created() {
      const survey = this.$route.query.survey;
      if (survey) {
        this.isEditMode = true;
        this.survey = JSON.parse(survey);
      }
    },
    methods: {
        async submitSurvey() {
    try {
        // Convert `likedMost` array to a comma-separated string
        const payload = {
            ...this.survey,
            likedMost: this.survey.likedMost.join(','),
        };

        if (this.isEditMode) {
            await axios.put(`/surveys/${this.survey.id}`, payload);
            alert("Survey updated successfully!");
        } else {
            await axios.post("/surveys", payload);
            alert("Survey submitted successfully!");
        }
        this.$router.push("/");
    } catch (error) {
        console.error(error);
        alert("Failed to submit the survey.");
    }
},
      cancel() {
        this.$router.push("/");
      },
    },
  };
  </script>
  