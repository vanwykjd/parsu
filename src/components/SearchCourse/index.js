import React, { Component } from 'react';

import { Form, Select, Spin } from 'antd';
import { getCourseList } from '../../courses';

const Option = Select.Option;

class SelectCourse extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      courseList: null,
      course: null,
      fetching: false,
      data: [],
    };
    
    this.selectCourse = this.selectCourse.bind(this);
    this.searchCourses = this.searchCourses.bind(this);
  }
  
  componentDidMount() {
    if (this.state.courseList) {
      return;
    }
    const courseList = getCourseList();
    this.setState({ courseList: courseList });
  }
  
  searchCourses(value) {
     this.setState({ data: [], fetching: true });
     const courseList = this.state.courseList;

     let data = [];
     for (var i = 0; i < courseList.length; i++) {
       const nameSearched = courseList[i].course_name.toLowerCase();
       if (nameSearched.match(value.toLowerCase())) {
         data.push({key: i, value: courseList[i].course_name });
       } 
     }
      
     this.setState({ data, fetching: false });
  }
  
  selectCourse(course) {
    const courseSelected = this.state.courseList[course];
    this.props.selectCourse(courseSelected);
    this.setState({ course: courseSelected, data: [], fetching: false});
  }
  
  
  render() {
    const { data, fetching, course } = this.state;
    const selectedCourse = (course) ? course.course_name : undefined;
    
    return (
    <Form.Item
      label={'Select a Course'}
      key={course}>
      <Select
        style={{ width: "100%" }}
        showSearch={true}
        allowClear
        showArrow={false}
        value={selectedCourse}
        defaultActiveFirstOption={false}
        placeholder="Search Courses"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        filterOption={false}
        onSearch={this.searchCourses}
        onChange={this.selectCourse}
      >
        {data.map(d => <Option key={d.key}>{d.value}</Option>)}
      </Select>
  </Form.Item>
     
    );
  }
}

export default (SelectCourse);