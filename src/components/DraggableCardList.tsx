import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Card from "../data/Card";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { reorderCard } from "../store/SetFormReducer";
import CardInput from "./CardInput";

function DraggableCardList() {
  const cards = useAppSelector((state) => state.cardSetForm.cards);
  const cardsError = useAppSelector((state) => state.cardSetForm.cardsError);
  const dispatch = useAppDispatch();
  return (
    <div>
      {cardsError && (
        <div className="border-2 border-error text-error w-2/4 py-2 mx-auto">
          NEED AT LEAST TWO NON EMPTY CARDS
        </div>
      )}

      <DragDropContext
        onDragEnd={(res) => {
          if (!res.destination) return;
          dispatch(
            reorderCard({
              source: res.source.index,
              dest: res.destination.index,
            })
          );
        }}
      >
        <Droppable droppableId="flashcards">
          {(provided) => (
            <ul
              className="flashcards"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {cards.map((value, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <CardInput index={index} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default DraggableCardList;
