import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Search, X } from "lucide-react";
import { ChatItem } from "./ChatItem";
import { RandomMessageBtn } from "../randomMessage/RandomMessageBtn";

export const ChatSearch = () => {
  const [query, setQuery] = useState("");
  const [filteredByName, setFilteredByName] = useState([]);
  const [filteredByMessage, setFilteredByMessage] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const chats = useSelector((state) => state.chat.chats);

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setFilteredByName(filterChatsByName(query));
      setFilteredByMessage(filterChatsByMessage(query));
      setShowResults(true);
    }
  };

  const hideResults = () => {
    setQuery("");
    setShowResults(false);
    setFilteredByName([]);
    setFilteredByMessage([]);
  };

  const filterChatsByMessage = (searchQuery) => {
    const queryWords = searchQuery.toLowerCase().split(/\s+/);

    return chats.filter((chat) => {
      return chat.messages.some((message) => {
        const messageWords = message.content.toLowerCase().split(/\s+/);
        console.log(messageWords);
        return queryWords.every((word) => messageWords.includes(word));
      });
    });
  };

  const filterChatsByName = (searchQuery) => {
    const queryWords = searchQuery.toLowerCase().split(/\s+/);

    return chats.filter((chat) => {
      const fullName = `${chat.firstName.toLowerCase()} ${chat.lastName.toLowerCase()}`;
      const nameWords = fullName.split(/\s+/);

      return queryWords.every((word) => nameWords.includes(word));
    });
  };

  useEffect(() => {
    const handleEscPress = (event) => {
      if (event.key === "Escape") {
        hideResults();
      }
    };

    if (query) {
      document.addEventListener("keydown", handleEscPress);
    } else {
      document.removeEventListener("keydown", handleEscPress);
    }

    return () => {
      document.removeEventListener("keydown", handleEscPress);
    };
  }, [query]);

  return (
    <div className="chat__container">
      <div className="chat__header">
        <div className="chat__picture">
          <img
            src="https://placehold.co/60x60"
            alt="profile"
            className="chat__img"
          />
          <div className={`chat__status ${true ? "active" : "inactive"}`}></div>
        </div>
        <RandomMessageBtn />
      </div>
      <form className="chat__form" onSubmit={submitSearch}>
        <button className="chat__search-button">
          <Search />
        </button>
        <input
          type="text"
          className="chat__input"
          placeholder="Search chat or message"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="chat__search-button"
            onClick={() => {
              hideResults();
            }}
          >
            <X />
          </button>
        )}
      </form>
      {filteredByName.length >= 1 || filteredByMessage.length >= 1 ? (
        <div className="chat__search-results-container">
          <div className="chat__search-results">
            {filteredByName.length >= 1 && (
              <>
                <h4 className="chat__search-results-title">
                  Found {filteredByName.length} chats
                </h4>
                {filteredByName.map((chat) => {
                  return (
                    <div
                      key={chat._id}
                      onClick={() => {
                        hideResults();
                      }}
                    >
                      <ChatItem key={chat._id} {...chat} />
                    </div>
                  );
                })}
              </>
            )}
            {filteredByMessage.length >= 1 && (
              <>
                <h4 className="chat__search-results-title">
                  Found {filteredByMessage.length} messages
                </h4>
                {filteredByMessage.map((chat) => {
                  return (
                    <div
                      key={chat._id}
                      onClick={() => {
                        hideResults();
                      }}
                    >
                      <ChatItem key={chat._id} {...chat} />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`${
            showResults ? "chat__search-results-container" : "hidden"
          }`}
        >
          <h4 className="chat__search-results-title">Nothing was found</h4>
        </div>
      )}
    </div>
  );
};
