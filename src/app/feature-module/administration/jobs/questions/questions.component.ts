import { Component } from '@angular/core';
import { routes } from 'src/app/core/helpers/routes/routes';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent {
  finishButtonClicked = false;

  public routes = routes;

  showQuizResultsModal = false;
  questions = [
    {
      question:
        'IS management has decided to rewrite a legacy customer relations system using fourth generation languages (4GLs). Which of the following risks is MOST often associated with system development using 4GLs?',
      options: [
        'Inadequate screen/report design facilities',
        'Complex programming language subsets',
        'Lack of portability across operating systems',
        'Inability to perform data-intensive operations',
      ],
    },
    {
      question:
        'Which of the following would be the BEST method for ensuring that critical fields in a master record have been updated properly?',
      options: [
        'Inadequate screen/report design facilities',
        'Complex programming language subsets',
        'Lack of portability across operating systems',
        'Inability to perform data-intensive operations',
      ],
    },
    {
      question:
        'Which of the following is a dynamic analysis tool for the purpose of testing software modules?',
      options: [
        'Blackbox test',
        'Desk checking',
        'Structured walk-through',
        'Design and code',
      ],
    },
    {
      question:
        'Which of the following is MOST likely to result from a business process reengineering (BPR) project?',
      options: [
        'An increased number of people using technology',
        'Significant cost savings, through a reduction in the complexity of information technology',
        'A weaker organisational structures and less accountability',
        'Increased information protection (IP) risk will increase',
      ],
    },
    {
      question:
        'Which of the following devices extends the network and has the capacity to store frames and act as a storage and forward device?',
      options: ['Gateway', 'Repeater', 'Bridge', 'Router'],
    },
    {
      question:
        'An offsite information processing facility having electrical wiring, air conditioning and flooring, but no computer or communications equipment is a:',
      options: [
        'Cold site',
        'Warm site',
        'Dial-up site',
        'Duplicate processing facility',
      ],
    },
  ];
  currentQuestionIndex = 0;
  correctAnswers!: number;
  wrongAnswers!: number;
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  finishQuiz() {
    this.finishButtonClicked = true;
  }
  closeModal() {
    this.showQuizResultsModal = false;
  }
}
