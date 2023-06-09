import EmojiPicker, {
  EmojiStyle,
  Emoji,
} from "emoji-picker-react";
import { useState } from "react";
export default function TestEmoji() {
  const [selectedEmoji, setSelectedEmoji] = useState("");

  function onClick(emojiData, event) {
    setSelectedEmoji(emojiData.unified);
  }

  return (
    <div className="App">
      <h2>Emoji Picker React 4 Demo</h2>
      <div className="show-emoji">
        Your selected Emoji is:
        {selectedEmoji ? (
          <Emoji
            unified={selectedEmoji}
            emojiStyle={EmojiStyle.APPLE}
            size={22}
          />
        ) : null}
      </div>

      <EmojiPicker
        onEmojiClick={onClick}
        autoFocusSearch={false}
        emojiStyle={EmojiStyle.NATIVE}
      />
    </div>
  );
}