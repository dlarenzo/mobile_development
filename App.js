import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

// IMPORT CHILDREN COMPONENTS
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  // call useState and set the State for enteredGoal (THIS WILL BE MOVED TO GoalInput.js SO COMMENT OUT HERE)
  // const [enteredGoalText, setEnteredGoalText] = useState("");

  // manage list of goals with useState.  Remember it will initialize with an empty array like input does with an empty string
  const [courseGoals, setCourseGoals] = useState([]);

  // UseState for Modal
  const [modalIsVisible, setModalIsVisible] = useState(false);

  // Modal Handler
  function startAddGoalHandler() {
    setModalIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalIsVisible(false);
  }

  // Add function for goal input handler.  (THIS WILL BE MOVED TO GoalInput.js SO COMMENT OUT HERE)
  // function goalInputHandler(enteredText) {
  //   setEnteredGoalText(enteredText);
  // }

  // Add function for add goal handler
  function addGoalHandler(enteredGoalText) {
    // call our setCourseGoals function and update our courseGoals array with the new goal
    // one way we could use the spread operator to add the new goal to the existing array
    // setCourseGoals([...courseGoals, enteredGoalText]);

    // BETTER WAY TO DO THIS BELOW(best practice):
    // But if your useState is dependent on the previous state, you should use the function form of setState
    // this function will automatically be called by React and will pass the previous state as an argument
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    // call our setCourseGoals function and update our new state
    setCourseGoals((currentCourseGoals) => {
      // filter out the goal that has the id we want to delete
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        {/* Button is a built-in component that we are passing the title prop to
        and the onPress prop to */}
        <Button
          title="Add New Goal"
          color="#a065ec"
          onPress={startAddGoalHandler}
        />
        {/* GoalInput is a child component that we are passing the onAddGoal prop to */}
        <GoalInput
          visible={modalIsVisible}
          onAddGoal={addGoalHandler}
          onCancel={endAddGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              // GoalItem is a child component that we are passing the text prop to
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});
