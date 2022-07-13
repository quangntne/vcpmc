import { Input, Col, Form, Tag, Row } from "antd";
import React, { useEffect } from "react";
import { TweenOneGroup } from "rc-tween-one";
import CircleLabel from "@view/shared/components/CircleLabel";
import { useTranslate } from "@view/shared/hook/useTranslate";
import PlayListEntities from "@modules/playlist/entity";
import { ITagPlaylist } from "@view/Playlist/interface";
interface ITopicProp {
  data?: any,
  checkIsEdit: boolean,
  editArray?: ITagPlaylist[],
  getArrayTag: any,
}
const TopicGallery = ({ data, checkIsEdit, getArrayTag, editArray }: ITopicProp) => {
  const [arrayTag, setArrayTag] = React.useState<any>([]);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [inputVisible, setInputVisible] = React.useState<boolean>(false);
  useEffect(() => {
    getArrayTag(arrayTag);
  }, [arrayTag])
  useEffect(() => {
    if(data?.topics) {
       
      setArrayTag(data.topics)
    }
  }, [data]);
 
  

  const handleClose = (removedTag) => {
    const tags = arrayTag.filter((tag) => tag.id !== removedTag.id);
    setArrayTag(tags);
  };

  const saveInputRef = (input) => {
    input = input;
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && arrayTag.indexOf(inputValue) === -1) {
      setArrayTag([
        ...arrayTag,
        { label: inputValue, id: Math.round(Math.random() * 1000) },
      ]);
    }
    setInputValue("");
    setInputVisible(false);
  };

  const showInput = () => {
    setInputVisible(true);
    setTimeout(() => {
      document.getElementById("input-add-tag").focus();
    }, 300);
  };

  const renderTag = () => {
    return (
      arrayTag &&
      arrayTag.map((item, index) => {
        return (
          <Col lg={8} sm={16} xs={24} key={index}>
            <CircleLabel colorCode="blue" text={item.label} />
          </Col>
        );
      })
    );
  };
  const renderArrTagEdit = () => {
    return (
      arrayTag &&
      arrayTag.map((tag, index) => {
        return (
          <span key={index} style={{ display: "inline-block" }}>
            <Tag
              closable
              onClose={(e) => {
                e.preventDefault();
                handleClose(tag);
              }}
            >
              {tag.label}
            </Tag>
          </span>
        );
      })
    );
  };
  const { TYPE_TOPIC, TOPIC } = useTranslate("playlistTranslateKey")
  if (checkIsEdit === true) {
    return (
      <Form.Item key="playlistCategories" name="playlistCategories" label={`${TOPIC}:`}>
        <div className="label-tag-edit">
          <div>
            <TweenOneGroup
              className="label-arr-tag"
              enter={{
                scale: 0.8,
                opacity: 0,
                type: "from",
                duration: 100,
                onComplete: (e: any) => {
                  e.target.style = "";
                },
              }}
              leave={{
                opacity: 0,
                width: 0,
                scale: 0,
                duration: 200,
              }}
              appear={false}
            >
              {renderArrTagEdit()}
            </TweenOneGroup>
          </div>
          {inputVisible && (
            <Input
              id="input-add-tag"
              ref={saveInputRef}
              type="text"
              size="small"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
              className="label-input-addtag"
            />
          )}
          {!inputVisible && (
            <Tag onClick={showInput} className="site-tag-plus">
              {TYPE_TOPIC}
            </Tag>
          )}
        </div>
      </Form.Item>
    );
  } else {
    return (
      <div>
        <Row>{renderTag()}</Row>
      </div>
    );
  }
};

export default TopicGallery;
